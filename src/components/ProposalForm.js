import { useState } from "react";

import { db } from "../firebase/config";

const ProposalForm = ({ user }) => {
    const [input, setInput] = useState({
        tag: "KITENDAWILI",
        question: "",
        answer: ""
    });

    const handleInputChange = (e) => {
        const target = e.target;
        const name = target.name;
        const value = target.value;

        setInput({
            ...input,
            [name]: value
        });
    }

    const clearModal = () => {
        setInput({
            tag: "KITENDAWILI",
            question: "",
            answer: ""
        });
    }

    const handleSubmit = (e) => {
        const re = /[a-z]|[A-Z]/g;

        // Something to be done during content submission
        if (re.test(input.question) && re.test(input.answer)) {
            if (user.email === "sonalpha023@gmail.com") {
                db.collection("Library").add({
                    tag: input.tag,
                    question: input.question,
                    answer: input.tag === "KITENDAWILI" ? input.answer.toUpperCase() : input.answer,
                    contributor: user.displayName
                })
            } else {
                db.collection("Proposals").add({
                    tag: input.tag,
                    question: input.question,
                    answer: input.tag === "KITENDAWILI" ? input.answer.toUpperCase() : input.answer,
                    contributor: user.displayName
                })
            }
            // alert(`Thanks ${user.displayName}! "${input.question}, ${input.answer}" was added.`)
        } else {
            alert("Invalid Entry!")
        }

        clearModal();
        e.preventDefault();
    }

    return (
        <div className="modal-content">
            <div className="modal-header text-dark">
                <h5 className="modal-title" id="enrollLabel">Content Proposal Form</h5>
                <button
                    type="button"
                    className="btn-close"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                    onClick={clearModal}></button>
            </div>
            {
                !!user ?
                    (<div className="modal-body text-dark">
                        <p className="lead">Fill out this form to contribute Content to USEMI</p>
                        <form onSubmit={handleSubmit}>
                            <div className="md-3">
                                <label htmlFor="tag" className="col-form-label">
                                    Pick Category:
                                </label>
                                <select
                                    value={input.tag}
                                    className="form-select"
                                    name="tag"
                                    onChange={handleInputChange}
                                >
                                    <option value="METHALI">METHALI</option>
                                    <option value="KITENDAWILI">KITENDAWILI</option>
                                </select>
                            </div>
                            <div className="md-3">
                                <label htmlFor="question" className="col-form-label">
                                    Question:
                                </label>
                                <input
                                    type="text"
                                    name="question"
                                    value={input.question}
                                    onChange={handleInputChange}
                                    className="form-control"
                                    id="question"
                                />
                            </div>
                            <div className="md-3">
                                <label htmlFor="answer" className="col-form-label">
                                    Answer:
                                </label>
                                <input
                                    type="text"
                                    name="answer"
                                    value={input.answer}
                                    onChange={handleInputChange}
                                    className="form-control"
                                    id="answer"
                                />
                            </div>
                            <div className="md-3 mt-3">
                                <input
                                    type="submit"
                                    className="btn btn-info"
                                    value="Submit"
                                    data-bs-dismiss="modal"
                                />
                            </div>
                        </form>
                    </div>) :
                    <div className="modal-body text-dark">
                        <p>You Must Have an Account to Fill In This Form</p>
                    </div>
            }
        </div>
    )
}

export default ProposalForm
