"use client";
import { getAlgoTradeVariable, postAlgoTradeVariable } from "@/api/algoTradeVariables";
import { get, map, startCase } from "lodash";
import { useParams, useSearchParams } from "next/navigation";
import React, { useState, useEffect } from "react";

const Variable = () => {
  // State to store variable data from the API
  const [variables, setVariables] = useState();
  const [formValue, setFormValue] = useState({});

  const {id} = useParams();
  const searchParams = useSearchParams();
  const strategy_name = searchParams.get('strategy_name');

  async function checkLogin() {
    if (sessionStorage.getItem("token") === null) {
      window.location.href = "/login";
    } else {
      return sessionStorage.getItem("token");
    }
  }

  async function callAPI(token) {
    const rawData = await getAlgoTradeVariable(token, id, strategy_name );
    const schemizedData = map(rawData, (value, key) => ({
      name: startCase(key),
      key: key
    }));
   setVariables(schemizedData);
   setFormValue(rawData);
  }

  // Handle form submission
  const handleSubmit = (event) => {
    event.preventDefault();
    //* TODO:  Need to add validation checks later on
    postAlgoTradeVariable(token, id, strategy_name, formValue).then((res) => {
      toast(res);
    });
  };

  //* Handle Input
  const handleInput = (opt, key) => {
    const textValue = opt.target.value;
    setFormValue({...formValue, [key]: textValue});
  }
  console.log(formValue,'1212')

  useEffect(() => {
    checkLogin().then((token) => {
      callAPI(token);
    });
  }, []);

  return (
    <div>
      <form onSubmit={handleSubmit}>
        {map(variables, ({key, name}) => (
          <div key={key} className="mb-4">
            <label className="block text-sm font-medium text-gray-600">
              {name}
            </label>
            <input
              type="text"
              className="mt-1 p-2 border rounded-md w-full"
              value={get(formValue, key)}
              onChange={(opt) => handleInput(opt, key)}
            />
          </div>
        ))}

        <button
          type="submit"
          className="px-4 py-2 bg-blue-500 text-white rounded-md"
          onClick={handleSubmit}
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default Variable;
