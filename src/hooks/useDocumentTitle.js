
// Name: Adeena Akram
// Registration No: 2500605

import { useEffect } from "react";

function useDocumentTitle(title) {
  useEffect(() => {
    document.title = title;
  }, [title]);
}

export default useDocumentTitle;
