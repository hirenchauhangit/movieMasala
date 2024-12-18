import React from "react";

function Button(props: any) {
  const { handleSortOrder, sortOrder } = props;
  return (
    <>
      <button onClick={handleSortOrder} className="mr-5 flex-auto">
        {sortOrder}
      </button>
    </>
  );
}

export default Button;
