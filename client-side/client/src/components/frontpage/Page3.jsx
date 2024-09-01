export default function Page3() {
    const reviews = [
        {
            name: "Mr. Shwetank Dohroo",
            review: "PhilanthroHub is exactly what I've been looking for! As someone who loves to support meaningful causes, this platform makes it so easy to find and connect with NGOs that align with my values. The directory is comprehensive, and the information provided helps me make informed decisions about where to donate. Highly recommended!"
        },
        {
            name: "Mr. Shubham Goyal",
            review: "I’ve always wanted to contribute to global causes but found it challenging to navigate through the sea of NGOs out there. PhilanthroHub simplifies the entire process. The platform's user-friendly design and extensive NGO listings have helped me find organizations that truly make a difference. Great job, PhilanthroHub team!"
        },
        {
            name: "Mr. Siddham Jain",
            review: "PhilanthroHub has made it so easy for me to support causes that matter. I appreciate the detailed information on each NGO, which gives me confidence that my donations are going to the right places. It’s amazing to have all this in one place. I’ll definitely keep coming back!"
        }
    ];
    return (
        <>
            <div className="frontpage_main3 flex flex-col w-auto items-center">
                <div className="frontpage_part3 w-full">
                    <div className="questionPhilantro flex justify-center">
                        <div className="philantro text-4xl font-bold">
                            <h1>Philantro Hub?</h1>
                        </div>
                    </div>
                    <div className="whatis flex flex-col items-center">
                        <div className="whatisphilantro text-2xl font-semibold">
                            <h1>What are we?</h1>
                        </div>
                        <div className="desc flex justify-center text-center w-6/12 text-xl border-4">
                            <h2>PhilanthroHub is an innovative platform designed to bridge the gap between compassionate donors and impactful NGOs around the world. Our mission is to simplify the process of finding and supporting non-profit organizations by providing a comprehensive directory of NGO contacts.</h2>
                        </div>
                        <div className="tbl2 flex w-full justify-between">
                            <div className="flex flex-col text-left benefits w-6/12 h-full">
                                <div className="text-2xl font-bold flex justify-center">
                                    <h1>Benefits</h1>
                                </div>
                                <ul className="benefitstbl2 border-4">
                                    <li>
                                        <h1 className="font-bold text-xl">Comprehensive Directory:</h1>
                                        <p>Access to a vast and well-organized directory of NGOs from around the world, making it easier to find organizations that align with your values and interests.</p>
                                    </li>
                                    <li>
                                        <h1 className="font-bold text-xl">Simplified Donation Process:</h1>
                                        <p>Streamlined tools and resources to make the donation process quick, easy, and secure, ensuring that your contributions reach the intended causes efficiently.</p>
                                    </li>
                                    <li>
                                        <h1 className="font-bold text-xl">Verified NGOs:</h1>
                                        <p>PhilanthroHub features vetted and credible NGOs, giving you peace of mind that your donations are going to legitimate and impactful organizations.</p>
                                    </li>
                                    <li>
                                        <h1 className="font-bold text-xl">User-Friendly Interface:</h1>
                                        <p>Contributing to causes you care about can provide a sense of satisfaction and purpose.</p>
                                    </li>
                                    <li>
                                        <h1 className="font-bold text-xl">Tax Benefits:</h1>
                                        <p>Designed with ease of use in mind, PhilanthroHub’s intuitive interface ensures a smooth and enjoyable experience for donors of all ages and tech-savviness levels.</p>
                                    </li>
                                </ul>
                            </div>
                            <div className="reviews w-6/12 flex flex-col text-right">
                                <div className="text-2xl font-bold flex justify-center">
                                    <h1>Donor's Appriciations</h1>
                                </div>
                                <ul className="revitbl border-4">
                                    {reviews.map((review, index) => (
                                        <li key={index}>
                                            <h1 className="font-bold text-xl">{review.name}</h1>
                                            <p>{review.review}</p>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
