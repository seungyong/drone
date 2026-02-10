# Drone Object Tracker

## 소개
간단한 웹 기반 드론(주로 DJI Tello)을 위한 프로토타입 프로젝트입니다. 이 프로젝트는 Flask로 제공되는 컨트롤 UI와 OpenCV 기반의 객체 추적/얼굴 탐지 기능을 결합하여, 웹에서 드론의 이륙/착륙 및 간단한 자율 추적(선택한 객체를 따라오기)을 실험할 수 있도록 합니다. 본 저장소는 교육용/프로토타입 성격이 강하며 강의 실습 또는 연구용 데모로 적합합니다.

## 주요 기능 (Key Features)
- 웹 기반 컨트롤 패널
  - 모바일 중심의 경량 UI(controller.html)로 드론 조작(이륙, 착륙 등) 가능
- 드론 제어 (DJI Tello 연동)
  - djitellopy 등 유사한 Tello 클라이언트를 이용한 기본 명령(예: takeoff, land) 구현
- 실시간 영상 처리 및 객체 추적
  - OpenCV의 Tracking API(CSRT 등)를 활용한 객체 추적 기능
  - 이미지 선택기(image selector)를 통해 추적 대상 지정
- 얼굴 탐지 툴
  - Haarcascade 기반 얼굴/눈 탐지 스크립트(tools/image_face_detect.py)를 포함
- 추적 동작 보완
  - 범위를 벗어날 경우 따라오도록 하는 기본 로직 포함(완전한 자율 주행은 아님)
- 분리된 구조
  - Flask 서버와 드론 매니저(drone_manager.py)로 책임 분리

> 참고: 커밋 기록에서 CSRT 기반 추적은 성능(프레임 처리 속도)에 제약이 있음을 언급하고 있습니다. 이 저장소는 실전 배포용이 아닌 실험/교육/프로토타이핑 목적입니다.

## 기술 스택 (Tech Stack)
| 구분 | 기술 스택 |
|------|-----------|
| Backend | ![Python](https://img.shields.io/badge/Python-3776AB?logo=python&logoColor=white) ![Flask](https://img.shields.io/badge/Flask-000000?logo=flask&logoColor=white) ![OpenCV](https://img.shields.io/badge/OpenCV-5C3EE8?logo=opencv&logoColor=white) |
| Frontend | ![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?logo=javascript&logoColor=white) ![jQuery](https://img.shields.io/badge/jQuery-0769AD?logo=jquery&logoColor=white) ![jQuery_Mobile](https://img.shields.io/badge/jQuery_Mobile-2A75BB?logo=jquery&logoColor=white) ![Jinja2](https://img.shields.io/badge/Jinja2-B41717?logo=jinja&logoColor=white) ![CSS](https://img.shields.io/badge/CSS-1572B6?logo=css3&logoColor=white) |
| Hardware / Client | ![DJI_Tello](https://img.shields.io/badge/DJI_Tello-1F8EF1?logo=dji&logoColor=white) |

## 시스템 구조 및 아키텍처
프로젝트 구조(핵심 파일 중심):

```
./
├─ main.py                     # 앱 진입점 (Flask 앱 실행)
├─ config.py                   # 설정(예: Tello 연결 정보, 포트)
├─ requirements.txt            # 파이썬 의존성
├─ droneapp/
│  ├─ __init__.py
│  ├─ controllers/
│  │  ├─ __init__.py
│  │  └─ server.py             # Flask 라우트 및 API 엔드포인트 (takeoff/land/stream 등)
│  ├─ models/
│  │  ├─ __init__.py
│  │  ├─ base.py               # 모델 공통/유틸 함수
│  │  └─ drone_manager.py      # Tello 클라이언트 래퍼: 연결, 명령 전송, 영상 처리 파이프라인
│  ├─ static/
│  │  ├─ css/
│  │  │  └─ controller.css     # 컨트롤러 스타일
│  │  └─ js/
│  │     └─ controller.js      # UI 상호작용 및 AJAX 요청
│  └─ templates/
│     ├─ layout.html
│     ├─ index.html            # 메인 페이지
│     └─ controller.html       # 모바일/컨트롤러 UI
├─ tools/
│  ├─ haarcascade_*.xml        # OpenCV Haarcascade 데이터
│  ├─ image_face_detect.py     # 독립 실행 얼굴 탐지 테스트 스크립트
│  └─ single.py                # 단일-목적 테스트 스크립트
```

각 폴더 역할 요약:
- droneapp/controllers: Flask 라우트와 HTTP API를 제공하여 UI와 드론 매니저를 연결합니다.
- droneapp/models: 드론 제어 및 영상 처리 로직(드론 매니저), 공통 유틸을 포함합니다.
- droneapp/static, droneapp/templates: 웹 UI(컨트롤러 및 메인 페이지) 리소스입니다.
- tools: 개발/테스트용 스크립트(얼굴 탐지 등)와 Haarcascade 데이터 파일이 위치합니다.

## 시작 가이드 (Getting Started)
### 요구 사항
- Python 3.7+ 권장
- DJI Tello 드론 (테스트 환경)

### 설치 (Installation)
1. 저장소를 클론합니다.

   git clone <REPO_URL>
   cd <REPO_DIRECTORY>

2. 가상 환경 생성(권장) 및 활성화

   python -m venv venv
   source venv/bin/activate  # macOS / Linux
   venv\Scripts\activate    # Windows

3. 의존성 설치

   pip install -r requirements.txt

### 설정
- 설정 파일(config.py)을 열어 Tello 연결 정보(필요 시 IP/포트), 디버그 옵션 등을 확인/수정하세요.
- 실 하드웨어 사용 시 Tello와 동일한 네트워크에 컴퓨터를 연결해야 합니다.

### 실행 (Run)
- 개발 모드로 로컬에서 실행:

   python main.py

- 실행 후 웹 브라우저에서 기본적으로 http://localhost:5000 또는 콘솔에 표시된 주소로 접속하세요.
- 컨트롤러 UI는 /controller (controller.html)로 접근합니다.

### 도구(선택)
- 얼굴 탐지 독립 실행 테스트:

   python tools/image_face_detect.py --input path/to/image.jpg

(스크립트 동작 방식과 옵션은 파일 내부 주석을 참고하세요.)

## 개발자 (Contributors)
| 이름 | 역할 | 기능 |
|------|------|------|
|      |      |      |

기여를 원하시면 이슈/풀 리퀘스트로 기능 제안이나 버그 리포트를 남겨주세요.

## 알려진 제한 및 권장 개선 사항
- CSRT 기반의 객체 추적은 정확도는 괜찮으나 프레임 처리 속도가 느릴 수 있어 실시간 제어 성능에 병목이 될 수 있습니다.
- 현재 추적 로직은 프로토타입 수준으로 장애물 회피나 고급 위치 제어는 미구현입니다.
- Tello의 비행 범위 및 안전을 고려한 추가 안전장치(최소 고도, 방위 제한 등) 구현 권장.

## 라이선스 (License)
This project is licensed under the MIT License.


----

빠른 시작 체크리스트:
- [ ] Python 환경 준비 및 requirements 설치
- [ ] config.py에서 Tello 네트워크/설정 확인
- [ ] python main.py로 서버 실행 후 /controller에서 UI 확인

문의 또는 데모 요청은 이 저장소의 이슈 트래커를 통해 알려주세요.