# Drone Object Tracker

## 소개
![image](docs/preview.png)

Drone Object Tracker는 DJI Tello 드론과 Flask 기반 웹 컨트롤러 및 OpenCV 기반 객체 추적을 결합한 중형 프로젝트입니다. 웹 인터페이스에서 드론을 이륙/착륙/조종하고, 사용자가 지정한 객체(또는 얼굴)를 추적하도록 드론을 제어할 수 있도록 설계되어 있습니다.

주요 목적은 교육용·프로토타입 용도로 드론의 비행 제어와 컴퓨터 비전(객체 추적, 얼굴 검출)을 통합하는 것입니다.

(참고: 프로젝트 루트에 logo/preview 이미지가 있는 경우 위 경로를 변경하세요.)

## 주요 기능
- 웹 기반 컨트롤러: 모바일/데스크탑에서 접근 가능한 컨트롤 UI(controller.html)를 통해 드론 제어
- 드론 제어(기본): takeoff, land 및 기본 방향 제어 명령 전송
- 객체 추적(Object Tracking): OpenCV CSRT 기반 추적을 통한 선택 객체 실시간 추적 (이미지 셀렉터 지원)
- 얼굴 검출(Face Detection): Haarcascade를 사용한 얼굴 검출 도구 및 예제 스크립트(tools/image_face_detect.py)
- 범위 이탈 시 추적 보정: 객체가 범위를 벗어나면 드론이 따라오도록 간단한 로직 포함
- 로컬 테스트 유틸리티: tools 폴더의 스크립트로 카메라/검출 알고리즘을 독립적으로 테스트 가능

## 기술 스택
| 구분 | 기술 스택 |
| :-- | :-- |
| **언어** | Python <img src="https://img.shields.io/badge/Python-3776AB?logo=python&logoColor=white" /> (약 59%) |
| **Backend / Drone SDK** | Flask <img src="https://img.shields.io/badge/Flask-000000?logo=flask&logoColor=white" /> / djitellopy (또는 유사 Tello client) |
| **Computer Vision** | OpenCV (cv2) <img src="https://img.shields.io/badge/OpenCV-5C3EE8?logo=opencv&logoColor=white" /> / Haarcascade |
| **Frontend** | JavaScript (jQuery, jQuery Mobile), HTML (Jinja2 템플릿), CSS |
| **유틸 / 스크립트** | tools/*.py (face detect, single-run 테스트) |
| **패키지 관리** | requirements.txt |

## 개발 인원
| 이름 | 역할 | 깃허브 |
| :--: | :--: | :--: |
| 이름 (사진) | 역할 | [GitHub](깃허브 링크) |

(참고: 실제 기여자 정보는 여기에 추가해 주세요.)

## 설치 및 실행 방법
1. 시스템 요구사항
   - Python 3.7+ 권장
   - DJI Tello 드론 (또는 Tello 에뮬레이터)
   - 드론과 제어 머신(PC/노트북/스마트폰)이 동일 네트워크(보통 Tello Wi-Fi)에 연결되어야 함

2. 저장소 복제
   ```bash
   git clone <REPO_URL>
   cd <REPO_DIR>
   ```

3. 가상환경 생성 및 의존성 설치
   ```bash
   python -m venv venv
   source venv/bin/activate   # Windows: venv\Scripts\activate
   pip install -r requirements.txt
   ```

4. 설정
   - config.py 파일에서 필요한 설정(예: Tello IP/포트, 추적 관련 파라미터)을 확인/수정합니다.
   - 기본 설정이 제공되어 있으면 별도 수정 없이 진행할 수 있습니다.

5. 서버 실행
   ```bash
   python main.py
   ```
   - 기본적으로 Flask가 포트 5000에서 실행됩니다. (환경 또는 main.py의 설정에 따름)

6. 웹 인터페이스 접속
   - 브라우저에서 http://localhost:5000 또는 main.py가 출력하는 주소로 접속
   - 모바일 기기에서 사용 시, 서버가 바인딩된 IP와 포트를 사용하세요.

7. 로컬 테스트(옵션)
   - tools/image_face_detect.py 와 tools/single.py를 사용해 카메라 또는 이미지 기반 검출을 독립적으로 테스트할 수 있습니다.

## 사용법
1. 웹 대시보드 접속(index.html)
   - 기본 페이지에서 컨트롤러로 이동하거나 바로 컨트롤 페이지(controller.html)를 엽니다.

2. 기본 컨트롤
   - Takeoff / Land 버튼으로 이륙 및 착륙을 제어합니다.
   - 방향 키(또는 조이스틱 UI)를 통해 수동으로 드론을 조작합니다.

3. 객체/영역 선택 및 추적
   - 컨트롤 화면에서 추적할 객체를 마우스로 드래그하거나 이미지 셀렉터를 통해 선택합니다.
   - ‘Start Tracking’(또는 유사 버튼)을 눌러 CSRT 기반 추적을 시작합니다.
   - 객체가 프레임의 특정 범위를 벗어나면(설정에 따라) 드론이 자동으로 보정하여 따라가도록 동작합니다.

4. 얼굴 검출
   - Face detection 모드를 활성화하면 Haarcascade를 이용해 얼굴을 검출합니다. (tools/haarcascade_frontalface_default.xml 사용)

5. 디버깅 및 로깅
   - 서버 로그 및 터미널 출력을 확인하여 드론 명령 전송 및 비전 파이프라인 상태를 모니터링하세요.

## 구조
주요 디렉토리/파일:

- main.py — 애플리케이션 진입점(Flask 앱 시작)
- config.py — 설정 파일(드론/추적/서버 설정)
- requirements.txt — Python 의존성 목록
- droneapp/
  - __init__.py
  - controllers/
    - server.py — Flask 라우트 및 Web 컨트롤러 엔드포인트
  - models/
    - base.py — 공통 모델/유틸
    - drone_manager.py — Tello 드론 연결 및 제어 추상화
    - haarcascade_frontalface_default.xml — 얼굴 검출용 분류기
  - static/
    - css/controller.css
    - js/controller.js — 컨트롤러 UI 스크립트 (입력 처리, AJAX/소켓 통신)
    - js/jquery-*.js, js/jquery.mobile-*.js
  - templates/
    - layout.html
    - index.html
    - controller.html — 웹 컨트롤 페이지
- tools/
  - image_face_detect.py — 얼굴 검출 테스트 스크립트
  - single.py — 단일 실행용 테스트 유틸
  - haarcascade_frontalface_default.xml, haarcascade_eye.xml

간단한 흐름 설명:
- main.py가 Flask 앱을 초기화하고 droneapp.controllers.server의 라우트를 사용해 웹 인터페이스를 제공
- drone_manager.py가 Tello SDK(djitellopy 등)와 통신하여 takeoff/land/이동 명령을 전송
- controller.js는 UI 입력을 서버에 전달하고, 영상/추적 상태를 표시
- OpenCV 기반 추적 및 Haarcascade는 tools와 모델에서 독립적으로 테스트 가능

## 기여 방법
- 기여는 환영합니다. 간단한 가이드:
  1. 레포지토리 포크
  2. 새로운 브랜치 생성 (feature/your-feature)
  3. 변경 후 PR 제출
- 큰 변경은 이슈(issue)를 먼저 열어 설계/조율을 권장합니다.

## 라이선스
- 현재 레포지토리에 명시된 라이선스 파일이 없습니다. 공개 배포/사용 조건을 명확히 하기 위해 LICENSE 파일을 추가하는 것을 권장합니다.


(이 README는 제공된 소스 트리, 진입점 및 커밋 로그를 기반으로 생성된 초안입니다. 상세 설정값이나 운영 환경에 따라 일부 설명을 수정해야 합니다.)