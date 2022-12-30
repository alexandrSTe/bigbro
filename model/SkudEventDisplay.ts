import SkudEvent from './SkudEvent';
import Student from './Student';

interface SkudEventDisplay extends SkudEvent {
  student: Student;
}

export default SkudEventDisplay;
