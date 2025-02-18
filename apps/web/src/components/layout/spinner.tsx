import { GearIcon } from '@radix-ui/react-icons';

function Spinner() {
  return (
    <div className={`inline-block animate-spin duration-500`}>
      <GearIcon />
    </div>
  );
}

export default Spinner;
