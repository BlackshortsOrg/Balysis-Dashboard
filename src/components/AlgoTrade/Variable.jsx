"use client";
import { getAlgoTradeVariable, postAlgoTradeVariable } from "@/api/algoTradeVariables";
import { get, map, startCase } from "lodash";
import { useParams, useSearchParams } from "next/navigation";
import React, { useState, useEffect } from "react";
import { toast } from "sonner";

const Variable = ({ instance_id, strategy_id }) => {
  // State to store variable data from the API
  const [variables, setVariables] = useState();
  const [formValue, setFormValue] = useState({});
  const [token, setToken] = useState("")

  // const { id } = useParams();
  const searchParams = useSearchParams();
  const strategy_name = searchParams.get('strategy_name');

  async function checkLogin() {
    if (sessionStorage.getItem("token") === null) {
      window.location.href = "/login";
    } else {
      const tk = sessionStorage.getItem("token");
      setToken(tk)
      return tk
    }
  }

  async function callAPI(token) {
    const rawData = await getAlgoTradeVariable(token, instance_id, strategy_name);
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
    console.log(formValue)
    postAlgoTradeVariable(token, instance_id, strategy_id, strategy_name, { variables: formValue }).then((res) => {
      if (res.status === 200) {
        toast.success("Variables Changed")
      } else {
        toast.error("Error changing variables")
      }
    });
  };

  //* Handle Input
  const handleInput = (opt, key, type) => {
    let textValue = opt.target.value;
    if (type === "number") {
      textValue = parseFloat(textValue);
    }
    setFormValue({ ...formValue, [key]: textValue });
  }

  useEffect(() => {
    checkLogin().then((token) => {
      callAPI(token);
    });
  }, [instance_id]);

  return (
    <div>
      <form onSubmit={handleSubmit}>
        {map(variables, ({ key, name }) => {
          const inputType = typeof get(formValue, key)
          let formInputType = "text";
          switch (inputType) {
            case "string":
              formInputType = "text";
              break;
            case "number":
              formInputType = "number";
              break;
            default:
              break
          }
          return (
            <div key={key} className="mb-4">
              <label className="block text-sm font-medium text-gray-600">
                {name}
              </label>
              <input
                type={typeof get(formValue, key) === "string" ? "text" : "number"}
                className="mt-1 p-2 border rounded-md w-full"
                value={get(formValue, key)}
                onChange={(opt) => handleInput(opt, key, inputType)}
              />
            </div>
          )
        })}

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
