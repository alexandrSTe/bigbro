import SkudEvent from './SkudEvent';
import Student from './Student';
import StudentStatus from './StudentStatus';

interface StudentDisplay extends Student {
  readonly lastEvent: SkudEvent;
  readonly status: StudentStatus;
}

export default StudentDisplay;
