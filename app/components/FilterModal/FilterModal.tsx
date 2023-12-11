import React, { useState, ChangeEvent } from "react";
import useFilterStore from "@/app/store/filterStore";

interface condition {
  header: string;
  condition: string;
  value: string;
}

const FilterModal = () => {
  const { filterData, setFilterList } = useFilterStore();
  const [filterConditions, setFilterConditions] = useState<condition[]>([
    { header: "", condition: "", value: "" },
  ]);

  const handleHeaderChange = (
    event: ChangeEvent<HTMLSelectElement>,
    index: number
  ) => {
    const updatedConditions = [...filterConditions];
    updatedConditions[index].header = event.target.value;
    setFilterConditions(updatedConditions);
  };

  const handleConditionChange = (
    event: ChangeEvent<HTMLSelectElement>,
    index: number
  ) => {
    const updatedConditions = [...filterConditions];
    updatedConditions[index].condition = event.target.value;
    setFilterConditions(updatedConditions);
  };

  const handleValueChange = (
    event: ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const updatedConditions = [...filterConditions];
    updatedConditions[index].value = event.target.value;
    setFilterConditions(updatedConditions);
  };

  const addCondition = () => {
    setFilterConditions([
      ...filterConditions,
      { header: "", condition: "", value: "" },
    ]);
  };

  const deleteCondition = (index: number) => {
    const updatedConditions = [...filterConditions];
    updatedConditions.splice(index, 1);
    setFilterConditions(updatedConditions);
  };
  return (
    <div>
      <button
        className="btn text-lg font-bold"
        onClick={() => document.getElementById("filterModal").showModal()}
      >
        Filter
      </button>
      <dialog id="filterModal" className="modal">
        <div className="modal-box w-11/12 max-w-7xl flex justify-center items-center flex-col">
          <div className="overflow-x-auto" style={{ width: "90%" }}>
            <table className="table">
              <thead>
                <tr className="text-center text-lg font-bold">
                  <th></th>
                  <th>Header</th>
                  <th>Condition</th>
                  <th>Value</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {filterConditions.map((condition, index) => (
                  <tr className="text-center filterItem" key={index}>
                    <td>{index + 1}</td>
                    <td>
                      <select
                        className="select select-bordered w-full max-w-xs filterHeader"
                        value={condition.header}
                        onChange={(event) => handleHeaderChange(event, index)}
                      >
                        <option disabled value="">
                          Which one do you filter?
                        </option>
                        <option value="id">ID</option>
                        <option value="first_name">First Name</option>
                        <option value="last_name">Last Name</option>
                        <option value="Email">Email</option>
                      </select>
                    </td>
                    <td>
                      <select
                        className="select select-bordered w-full max-w-xs text-center filterCondition"
                        value={condition.condition}
                        onChange={(event) =>
                          handleConditionChange(event, index)
                        }
                      >
                        <option disabled value="">
                          What is your condition?
                        </option>
                        <option value="==">=</option>
                        <option value="!=">&ne;</option>
                        <option value=">">{">"}</option>
                        <option value="<">{"<"}</option>
                        <option value=">=">{">="}</option>
                        <option value="<=">{"<="}</option>
                      </select>
                    </td>
                    <td>
                      <input
                        type="text"
                        placeholder="Type here"
                        className="input input-bordered w-full max-w-xs filterInput"
                        value={condition.value}
                        onChange={(event) => handleValueChange(event, index)}
                      />
                    </td>
                    <td>
                      <button
                        className="btn btn-outline btn-error"
                        onClick={() => deleteCondition(index)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <button
              className="btn btn-outline mt-5 ml-2 mb-2"
              onClick={addCondition}
            >
              Add Condition
            </button>
          </div>
          <div className="modal-action">
            <form method="dialog">
              {/* if there is a button, it will close the modal */}
              <button
                className="btn btn-outline btn-primary mt-5 font-bold text-xl"
                onClick={() => {
                  setFilterList(
                    filterConditions.filter((item) => item.value != "")
                  );
                }}
              >
                Confirm Filter
              </button>
              <button
                className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
                onClick={() => document.getElementById("filterModal").close()}
              >
                ✕
              </button>
            </form>
          </div>
        </div>
      </dialog>
    </div>
  );
};

export default FilterModal;
