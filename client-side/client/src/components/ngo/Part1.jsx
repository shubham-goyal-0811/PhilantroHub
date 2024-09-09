export default function Part1() {
    const ngosArray = [
        "Idhr hogi ngos"
    ];

    return (
        <>
            <div className="parentmain1 h-full w-full">
                <div className="childmain1">
                    <div className="ngos flex justify-between">
                        <div className="cate h-full w-4/12" style={{padding: '1%', margin: '0.5%'}}>
                            <h1 className="text-5xl">Categories hogi idhr</h1> 
                        </div>
                        <div className="ngosdiv w-full h-full flex flex-col items-center" style={{padding: '1%', margin: '0.5%'}}>
                            {ngosArray.map((ngo, index) => (
                                <div className="ngospace w-full flex text-4xl justify-center" style={{padding: '0.5%'}} key={index} >
                                    {ngo}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
