import type { Reminder } from '../types';
import { formatDate } from '../utils/dateUtils';

interface ReminderAlertProps {
  reminder: Reminder;
  onDismiss: (id: string) => void;
}

const ReminderAlert = ({ reminder, onDismiss }: ReminderAlertProps) => {
  return (
    <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-4 rounded-r-lg">
      <div className="flex items-start">
        <div className="flex-shrink-0">
          <span className="text-yellow-400 text-xl">🔔</span>
        </div>
        <div className="ml-3 flex-1">
          <p className="text-sm text-yellow-700">
            {reminder.message}
          </p>
          <p className="text-xs text-yellow-500 mt-1">
            {formatDate(reminder.date)}
          </p>
        </div>
        <button
          onClick={() => onDismiss(reminder.id)}
          className="ml-auto flex-shrink-0 text-yellow-500 hover:text-yellow-700"
        >
          ✕
        </button>
      </div>
    </div>
  );
};

export default ReminderAlert;