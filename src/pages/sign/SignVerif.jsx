import React, { useState } from "react";

const SignVerif = () => {
    const verificationCode = "123456"; // Remplacez ceci par votre code de vérification

    const [inputValues, setInputValues] = useState(["", "", "", "", "", ""]);
    const [message, setMessage] = useState("");

    const handleChange = (index, value) => {
        if (/^\d*$/.test(value) && value.length <= 1) {
            const newInputValues = [...inputValues];
            newInputValues[index] = value;
            setInputValues(newInputValues);

            // Activer automatiquement le champ d'entrée suivant
            if (index < 5 && value !== "") {
                document.getElementById(`input-${index + 1}`).focus();
            }
        }
    };

    const handleSubmit = () => {
        const enteredCode = inputValues.join("");
        if (enteredCode === verificationCode) {
            setMessage("Code de vérification valide !");
        } else {
            setMessage("Code de vérification incorrect. Veuillez réessayer.");
        }
    };
    return (
        <>
            <section className="contentSignVerif">
                <h1>two-factor authentication</h1>
                {inputValues.map((value, index) => (
                    <input key={index} id={`input-${index}`} placeholder="_" type="text" maxLength="1" value={value} onChange={(e) => handleChange(index, e.target.value)} />
                ))}
                <section></section>
                <button>CHECK CODE</button>
            </section>
        </>
    );
};

export default SignVerif;
