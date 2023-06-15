export default function TabPanel({ children, showPanel }) {
  return (
    <div role="tabpanel" hidden={!showPanel}>
      {showPanel && children}
    </div>
  );
}
