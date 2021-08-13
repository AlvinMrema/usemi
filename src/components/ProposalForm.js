import { useState } from "react";

const ProposalForm = () => {
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
        console.log(input)  // Something to be done during content submission

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
            <div className="modal-body text-dark">
                <p className="lead">Fill out this form to add Content to USEMI</p>
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
            </div>
        </div>
    )
}

export default ProposalForm
