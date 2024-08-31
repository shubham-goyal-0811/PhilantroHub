export default function Page2() {
    return (
        <>
            <div className="frontpage_main2 flex flex-col w-auto items-center" style={{ marginTop: '1%', padding: '1%', height: '96vh' }}>
                <div className="frontpage_part2 w-full">
                    <div className="questionNGO? flex justify-center" style={{ padding: '1%' }}>
                        <div className="NGO? text-4xl font-bold">
                            <h1>NGO?</h1>
                        </div>
                    </div>
                    <div className="whatis flex flex-col items-center" style={{ padding: '1%' }}>
                        <div className="whatisngo text-2xl font-semibold">
                            <h1>What are NGOs?</h1>
                        </div>
                        <div className="ans flex justify-center text-center w-6/12 text-xl border-4" style={{ padding: '1.5%' }}>
                            <h2>A Non-Governmental Organization (NGO) is an independent, non-profit group dedicated to addressing social, environmental, and humanitarian issues. They work outside government control, advocating for causes like human rights, education, and health. NGOs empower communities, provide services, and influence policies to create positive social change.</h2>
                        </div>
                        <div className="types_whatis">
                            <a href=""><h2>Know the Types of NGOs</h2></a>
                        </div>
                        <div className="tbl flex w-full justify-between" style={{ margin: '1%', padding: '1.5%', }}>
                            <div className="flex flex-col text-left benefits w-6/12">
                                <div className="text-2xl font-bold flex justify-center">
                                    <h1>Benefits</h1>
                                </div>
                                <ul className="benefitstbl border-4" style={{ margin: '1%' }}>
                                    <li style={{ padding: '1%' }}>
                                        <h1 className="font-bold text-xl">Support for Important Causes: </h1>
                                        <p className=" ">Your contributions can help fund essential programs and services, such as education, healthcare, and environmental conservation.</p>
                                    </li>
                                    <li style={{ padding: '1%' }}>
                                        <h1 className="font-bold text-xl">Positive Impact on Communities: </h1>
                                        <p>Donations can lead to significant improvements in the quality of life for individuals and communities in need.</p>
                                    </li>
                                    <li style={{ padding: '1%' }}>
                                        <h1 className="font-bold text-xl">Advancement of Social Justice: </h1>
                                        <p>NGOs often work on issues related to human rights and social equity, helping to address and rectify injustices.</p>
                                    </li>
                                    <li style={{ padding: '1%' }}>
                                        <h1 className="font-bold text-xl">Personal Fulfillment: </h1>
                                        <p>Contributing to causes you care about can provide a sense of satisfaction and purpose.</p>
                                    </li>
                                    <li style={{ padding: '1%' }}>
                                        <h1 className="font-bold text-xl">Tax Benefits: </h1>
                                        <p>In many countries, donations to registered charities or NGOs are tax-deductible.</p>
                                    </li>
                                </ul>
                            </div>
                            <div className="howtopoints w-6/12 flex flex-col text-right">
                                <div className="text-2xl font-bold flex justify-center">
                                    <h1>How to Donate?</h1>
                                </div>
                                <ul className="howtotbl border-4" style={{ margin: '1%' }}>
                                    <li style={{ padding: '1%' }}>
                                        <h1 className="font-bold text-xl">Support for Important Causes: </h1>
                                        <p className=" ">Your contributions can help fund essential programs and services, such as education, healthcare, and environmental conservation.</p>
                                    </li>
                                    <li style={{ padding: '1%' }}>
                                        <h1 className="font-bold text-xl">Positive Impact on Communities: </h1>
                                        <p>Donations can lead to significant improvements in the quality of life for individuals and communities in need.</p>
                                    </li>
                                    <li style={{ padding: '1%' }}>
                                        <h1 className="font-bold text-xl">Advancement of Social Justice: </h1>
                                        <p>NGOs often work on issues related to human rights and social equity, helping to address and rectify injustices.</p>
                                    </li>
                                    <li style={{ padding: '1%' }}>
                                        <h1 className="font-bold text-xl">Personal Fulfillment: </h1>
                                        <p>Contributing to causes you care about can provide a sense of satisfaction and purpose.</p>
                                    </li>
                                    <li style={{ padding: '1%' }}>
                                        <h1 className="font-bold text-xl">Tax Benefits: </h1>
                                        <p>In many countries, donations to registered charities or NGOs are tax-deductible.</p>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}