export type ZoneModalProps = {
  visible: boolean;
  onModalToggle: () => void;
  error?: { message: string };
  data: { zones: { id: string; title: string }[] };
  setZone: (s: { value: string; label: string }) => void;
  location: { value: string };
};
