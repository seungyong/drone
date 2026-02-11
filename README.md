# Tello Drone Object Tracker (Tello 드론 객체 추적기)

## 소개
이 프로젝트는 DJI Tello 드론과 OpenCV를 결합해 웹 기반 컨트롤 인터페이스에서 객체 추적(Object Tracking)과 간단한 드론 제어(이륙/착륙 등)를 실험할 수 있도록 만든 교육/프로토타입용 애플리케이션입니다. Flask 기반의 서버가 웹 UI를 제공하며, OpenCV의 Haarcascade 및 CSRT 트래커를 활용해 얼굴/객체 검출과 이어지는 추적을 수행합니다.

이 프로젝트는 학습용 및 프로토타이핑 목적의 중간 규모 프로젝트로, 실전 배포보다는 연구·수업·토이 프로젝트 성격이 강합니다. (커밋 히스토리에서 초기 구현, 트래킹 실험, Flask + Tello 통합 등의 흐름이 나타납니다.)

## 주요 기능 (Key Features)
- 웹 기반 컨트롤 페이지를 통한 드론 원격 제어(이륙, 착륙 등)
- OpenCV Haarcascade 기반 얼굴(또는 임의 객체) 검출
- CSRT(Object Tracker)를 이용한 객체 추적 기능 (추적 중 시야 밖으로 벗어나면 따라오도록 보정하는 로직 포함)
- 드론 세션/상태를 관리하는 모듈화된 DroneManager
- 모바일 친화적인 UI (jQuery Mobile)을 사용한 컨트롤러 페이지
- 테스트 및 유틸: tools 폴더의 이미지 기반 얼굴 검출/단일 테스트 스크립트

(커밋 메시지 분석 근거: "flask + tello", "CSRT를 통한 Object Tracking 사용", "image selector", "드론 기초 구현" 등)

## 기술 스택 (Tech Stack)
| 구분 | 기술 스택 |
|------|-----------|
| Backend | ![Python](https://img.shields.io/badge/Python-3776AB?logo=python&logoColor=white) ![Flask](https://img.shields.io/badge/Flask-000000?logo=flask&logoColor=white) |
| Computer Vision | ![OpenCV](https://img.shields.io/badge/OpenCV-5C3EE8?logo=opencv&logoColor=white) (Haarcascade, CSRT) |
| Drone | ![DJI_Tello](https://img.shields.io/badge/Tello-002868?logo=dji&logoColor=white) (djitellopy 혹은 유사 클라이언트) |
| Frontend | ![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?logo=javascript&logoColor=white) ![jQuery](https://img.shields.io/badge/jQuery-0769AD?logo=jquery&logoColor=white) ![jQuery_Mobile](https://img.shields.io/badge/jQuery_Mobile-0088CC?logo=jquery&logoColor=white) |
| Markup & Templates | ![HTML5](https://img.shields.io/badge/HTML5-E34F26?logo=html5&logoColor=white) (Jinja2) ![CSS3](https://img.shields.io/badge/CSS3-1572B6?logo=css3&logoColor=white) ![Jinja2](https://img.shields.io/badge/Jinja2-B41717?logo=jinja&logoColor=white) |
| 기타 | ![OpenCV_XML](https://img.shields.io/badge/Haarcascade-6A7FDB?logo=opencv&logoColor=white) |

## 시스템 구조 및 아키텍처
프로젝트 주요 파일/폴더 구조(간략):

```
README.md
config.py                 # 설정(포트, 드론 연결 정보 등)
main.py                   # 진입점 (Flask 앱 실행)
requirements.txt

droneapp/
├─ __init__.py
├─ controllers/
│  ├─ __init__.py
│  └─ server.py           # Flask 라우팅, API 엔드포인트 (컨트롤 UI 및 드론 명령 처리)
├─ models/
│  ├─ __init__.py
│  ├─ base.py             # 공통 모델/유틸, 설정 로딩 등
│  ├─ drone_manager.py    # 드론 연결/세션/명령 추상화 (djitellopy 연동 지점)
│  └─ haarcascade_frontalface_default.xml  # 얼굴 검출용 분류기
├─ static/
│  ├─ css/controller.css
│  └─ js/controller.js    # UI 동작, 웹소켓/HTTP 폴링을 통한 제어
└─ templates/
   ├─ layout.html
   ├─ index.html          # 메인 페이지
   └─ controller.html     # 모바일/컨트롤러 UI

tools/
├─ haarcascade_eye.xml
├─ haarcascade_frontalface_default.xml
├─ image_face_detect.py   # 이미지 기반 얼굴 검출 테스트 유틸
└─ single.py              # 단일 테스트 스크립트
```

각 폴더 역할 요약:
- droneapp/controllers: HTTP 라우팅 및 API 엔드포인트 구현 (웹 UI와 드론 매니저 연결)
- droneapp/models: 드론 제어(DroneManager)와 이미지 처리/검출 관련 로직 모음
- droneapp/static & templates: 웹 UI 리소스 (jQuery, jQuery Mobile 기반 모바일 UI)
- tools: 독립 실행형 테스트/유틸리티 스크립트

진입점: main.py (Flask 앱을 실행하며 config.py 로 설정을 로드합니다)
핵심 연동 파일: droneapp/controllers/server.py, droneapp/models/drone_manager.py

## 시작 가이드 (Getting Started)
아래 지침은 로컬 개발 환경에서 테스트하는 방법입니다. 드론(Tello)과 실제로 연결하여 제어하려면 드론의 Wi‑Fi 네트워크에 호스트(서버)가 연결되어 있어야 합니다.

설치(Installation)
1. 가상환경 생성 및 활성화(권장)

   Linux / macOS
   ```bash
   python3 -m venv venv
   source venv/bin/activate
   ```

   Windows (PowerShell)
   ```powershell
   python -m venv venv
   .\venv\Scripts\Activate.ps1
   ```

2. 의존성 설치

   ```bash
   pip install -r requirements.txt
   ```

   requirements.txt 에는 Flask, opencv-python, djitellopy (또는 유사 Tello 클라이언트), numpy 등 필요한 패키지가 포함되어 있습니다.

설정
- config.py 파일을 확인하여 포트, 디버그 모드, 드론 연결 설정(예: Tello IP/포트 또는 시뮬레이터 정보)을 필요에 따라 수정하세요.

실행(Run)
1. 로컬 서버 실행

   ```bash
   python main.py
   ```

   또는 Flask 환경으로 실행

   ```bash
   export FLASK_APP=main.py
   flask run --host=0.0.0.0 --port=5000
   ```

2. 브라우저에서 접속
- 메인 페이지: http://localhost:5000/ 혹은 config.py 에 지정한 호스트/포트
- 모바일 컨트롤러: http://localhost:5000/controller (프로젝트 템플릿에 따라 경로가 다를 수 있음)

드론 연결 주의사항
- Tello 드론과 통신하려면 보통 서버가 드론의 Wi‑Fi 네트워크에 연결되어야 합니다. 그렇지 않으면 드론 명령(이륙/착륙 등)이 작동하지 않습니다.
- 처음에는 시뮬레이터 또는 tools 폴더의 이미지 기반 유틸(image_face_detect.py, single.py)로 로직을 검증한 후 실기체 연결을 권장합니다.

테스트 유틸
- 이미지 얼굴 검출 테스트:
  ```bash
  python tools/image_face_detect.py --image path/to/image.jpg
  ```
- 단일 테스트 스크립트 실행:
  ```bash
  python tools/single.py
  ```

## 개발자 (Contributors)
| 이름 | 역할 | 기능 |
|------|------|------|
|      |      |      |

기여를 환영합니다! 이슈 티켓/풀 리퀘스트 방식으로 개선 사항을 제출해주세요.

## 라이선스 (License)
This project is licensed under the MIT License.

## 운영 및 확장 제안 (Notes & Next Steps)
- 안정성: 실비행을 위한 안전 장치(엔진 차단, 최대 거리/고도 제한, 비상 착륙 로직) 추가 필요
- 트래킹 성능: CSRT는 정확도가 높은 편이나 처리 속도가 느릴 수 있음. 경량화 모델이나 YOLO 계열 객체 탐지 + 추적 결합 고려
- 시뮬레이션: Tello 시뮬레이터(혹은 SITL) 연동으로 안전하게 개발/디버깅 가능
- 웹소켓 전환: 현재 폴링 방식이면 실시간 제어 성능 향상을 위해 WebSocket(Flask-SocketIO) 전환 고려

문의 및 지원
- 코드와 구조에 대해 궁금한 점이 있으면 프로젝트 이슈로 남겨주세요. 실사용 환경(드론 모델, 네트워크 구성 등)을 함께 적어주시면 더욱 빠르게 도움드릴 수 있습니다.