---
title: 'PosePhys'
description: 'Human Pose Estimation for Physiotherapy'
link: https://senior.ceng.metu.edu.tr/2020/posephys/#/
techstack:
    - Python
    - Vue
    - GraphQL
    - AWS
    - TensorFlow
cover: /senior_project/poster.png
source: 'https://senior.ceng.metu.edu.tr/2020/posephys/#/'
order: 3
---

Our project, PosePhys, was awarded first place in the METU CENG Senior Project Competition.

## Purpose and Features

The system comes with the idea of supervising the physiotherapy patients with real time human pose estimation, using minimal equipment just like a webcam, and reporting the treatment results to the physiotherapists.

- Real-time human pose estimation
- Real time patient pose comparison and feedback mechanism for patients
- Data and pose analysis for physiotherapists to inform them about their patient's progresses
- Exercise pool that physiotherapists can choose or upload an exercise for their patients
- Exercise and treatment scheduling for physiotherapists
- Notification & reminder system for patients

## Overall System Architecture

![Architecture](/senior_project/architecture.png)

Some parts of the system such as web application and treatment data lake lives in AWS ecosystem. We use Cloudfront to distribute our content and S3 to store our data. Only the backend lives in the Metu Ceng Servers.
Since all of the heavy computations are done on the client side(on the browser) and we are on free-tier, current system has zero cost.

## Team

- [Emre Akbaş](https://user.ceng.metu.edu.tr/~emre/) - **Supervisor**

- [Bedirhan Uğuz](https://www.linkedin.com/in/bedirhan-uguz/) - Developer
- [Gürkan Kısaoğlu](https://www.linkedin.com/in/gkisaoglu/) - Developer
- [Özhan Suat](https://www.linkedin.com/in/ozhansuat/) - Developer
- [İlker Sığırcı](https://www.linkedin.com/in/ilkersigirci/) - Developer


## Social Media Posts

- [Youtube](https://www.youtube.com/watch?v=kEy-qPCsWW4)
- [Twitter](https://x.com/odtu_bilg_muh/status/1268522972949725184)
- [Facebook](https://facebook.com/ODTU.Bilgisayar.Muhendisligi/photos/ceng-demo-day-2020-1siposephysbedirhan-u%C4%9Fuz-g%C3%BCrkan-k%C4%B1sao%C4%9Flu-ilker-s%C4%B1%C4%9F%C4%B1rc%C4%B1-%C3%B6zhan-/2753756344734294)