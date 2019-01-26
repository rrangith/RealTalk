from SimpleWebSocketServer import SimpleWebSocketServer, WebSocket
from threading import Thread
import time

retry_threshold = 5
socket_url = "127.0.0.1"
socket_port = 5006

clients = []


class SockerServer(WebSocket):

    def handleMessage(self):
        for client in clients:
            client.sendMessage(self.data)

    def handleConnected(self):
        print(" > New client connected ", self.address, 'connected')
        for client in clients:
            client.sendMessage(' - connected')
        clients.append(self)

    def handleClose(self):
        clients.remove(self)
        print(self.address, 'closed')
        for client in clients:
            client.sendMessage(self.address[0] + u' - disconnected')


def spinup_server():
    print("Starting websocket server")
    server = SimpleWebSocketServer('', socket_port, SockerServer)
    server.serveforever()


def init():
    thread = Thread(target=spinup_server)
    thread.start()

    time.sleep(4)
    print("Number of connected clients", len(clients))
