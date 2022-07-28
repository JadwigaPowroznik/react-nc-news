import { useState } from "react";
import ButtonComments from "./ButtonComments";

export default function CommentsPopup({ children }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <section>
      <div className="showMenu">
        <ButtonComments
          onClick={() => {
            setIsOpen((currentOpeness) => !currentOpeness);
          }}
        >
          Comments
        </ButtonComments>
      </div>
      {isOpen && <ul>{children}</ul>}
    </section>
  );
}
