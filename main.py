# 1. python 3.11.4 설치
# 2. 프로젝트 최상단에서 pip install -r requirements.txt
# 3. https://ffmpeg.org/download.html (windows)
# 4. python main.py

import logging
import sys

import droneapp.controllers.server

logging.basicConfig(level=logging.INFO,
                    stream=sys.stdout)


if __name__ == '__main__':
    droneapp.controllers.server.run()