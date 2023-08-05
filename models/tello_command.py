from djitellopy import Tello

class TelloCommand:
    _instance = None
    _tello = None

    def __new__(cls):
        if cls._instance is None:
            cls._instance = super(TelloCommand, cls).__new__(cls)
            cls._tello = Tello()
            cls._tello.connect()
        return cls._instance

    def get_battery(self):
        return self._tello.get_battery()
    
    def take_off(self):
        self._tello.takeoff()

    def land(self):
        self._tello.land()