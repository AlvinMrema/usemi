import ProposalForm from "./ProposalForm";

const Proposals = () => {
    return (
        <div className="mt-2">
            <div className="text-end">
                <button className="btn btn-info btn-lg" data-bs-toggle="modal" data-bs-target="#enroll">
                    Propose
                </button>
            </div>
            <hr />

            {/* <!-- Modal --> */}
            <div className="modal fade" id="enroll" tabIndex="-1" aria-labelledby="enrollLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <ProposalForm />
                </div>
            </div>
        </div>
    )
}

export default Proposals
