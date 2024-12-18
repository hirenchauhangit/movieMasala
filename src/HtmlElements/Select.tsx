import React from "react";

function Select(props: any) {
  const { changeSortOption } = props;
  return (
    <>
      <select onChange={changeSortOption} className="mr-5 flex-auto">
        <option value="">sort by...</option>
        <option value="episode_id">sort by Id</option>
        <option value="title">sort by Name</option>
        <option value="release_date">sort by Date</option>
      </select>
    </>
  );
}

export default Select;
