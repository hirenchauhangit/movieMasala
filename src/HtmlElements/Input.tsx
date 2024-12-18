import React from "react";

function Input(props: any) {
  const { handleFilterChange, searchImage } = props;
  return (
    <div className="search-bar">
      <input
        type="text"
        placeholder="Type to search..."
        onChange={handleFilterChange}
      />
      {searchImage && <img src={searchImage} alt="search" />}
    </div>
  );
}

export default Input;
