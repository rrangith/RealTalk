# RealTalk
Many of us have a hard time preparing for interviews, presentations, and any other social situation. We wanted to sit down and have a real talk... with ourselves.
## What it does
The app will analyse your speech, hand gestures, and facial expressions and give you both real-time feedback as well as a complete rundown of your results after you're done.
## How We built it
We used Flask for the backend and used OpenCV, TensorFlow, and Google Cloud speech to text API to perform all of the background analyses. In the frontend, we used ReactJS and Formidable's Victory library to display real-time data visualisations.
## Challenges we ran into
We had some difficulties on the backend integrating both video and voice together using multi-threading. We also ran into some issues with populating real-time data into our dashboard to display the results correctly in real-time.
## Accomplishments that we're proud of
We were able to build a complete package that we believe is purposeful and gives users real feedback that is applicable to real life. We also managed to finish the app slightly ahead of schedule, giving us time to regroup and add some finishing touches.
## What we learned
We learned that planning ahead is very effective because we had a very smooth experience for a majority of the hackathon since we knew exactly what we had to do from the start.
## What's next for RealTalk
We'd like to transform the app into an actual service where people could log in and save their presentations so they can look at past recordings and results, and track their progress over time. We'd also like to implement a feature in the future where users could post their presentations online for real feedback from other users. Finally, we'd also like to re-implement the communication endpoints with websockets so we can push data directly to the client rather than spamming requests to the server.

![Image](https://i.imgur.com/aehDk3L.gif)

Tracks movement of hands and face to provide real-time analysis on expressions and body-language.

![Image](https://i.imgur.com/tZAM0sI.gif)

### Based On: 
https://github.com/amccannv/uoft2019

### Image Classification Models:
https://github.com/victordibia/handtracking

https://github.com/oarriaga/face_classification
