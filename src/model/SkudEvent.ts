interface SkudEvent {
  id: number;
  type: 'ENTER' | 'EXIT';
  timestamp: number;
}

export default SkudEvent;
