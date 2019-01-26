import time
import json
import websocket
import sys
ws = websocket.WebSocket()
retry_threshold = 5
socketurl = ""


def send_message(message, source):
    global ws

    payload = json.dumps(
        {'event': 'detect', 'data': message, "source": source})
    try:
        ws.send(payload)
    except websocket.WebSocketConnectionClosedException:
        print("Error: Connection is closed. Retrying after ", retry_threshold)
        reconnect_socket()
    except websocket.WebSocketException:
        print(
            "Error: something went wrong with the socket. Retrying after ", retry_threshold)
        reconnect_socket()
    except BrokenPipeError:
        print("Error: Broken Pipe. Retrying after ", retry_threshold)
        reconnect_socket()
    except:
        print("Unexpected error:", sys.exc_info()[0])
        raise


def reconnect_socket():
    time.sleep(retry_threshold)
    print("Reconnecting websocket ......", socketurl)
    socket_init(socketurl)


def socket_init(url):
    global ws, socketurl
    socketurl = url
    ws = websocket.WebSocket()
    try:
        ws.connect(url)
        print("Websocket connection successful")
    except ConnectionRefusedError:
        print("Websocket Connection refused")
        reconnect_socket()

