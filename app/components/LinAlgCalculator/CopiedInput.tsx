import React from "react";

interface inputProp{
    onChange: (input: string) => void;
}

export default function CopiedInput({onChange}: inputProp){
    return(
        <div className="flex gap-4">
            <textarea
            onChange = {(e) => onChange(e.target.value)}
            className="w-full border border-gray-300 p2"
            rows={5}
            />
        </div>
    );
};