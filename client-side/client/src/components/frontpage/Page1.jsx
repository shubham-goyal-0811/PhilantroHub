import { useState, useEffect } from 'react';
import itachi from '../../img/itachi.jpg';
export default function Page1() {
    const qts = [
        {
            quote: "The best way to not feel hopeless is to get up and do something. Don’t wait for good things to happen to you. If you go out and make some good things happen, you will fill the world with hope, you will fill yourself with hope.",
            by: "― Barack Obama"
        },
        {
            quote: "We only have what we give.",
            by: "― Isabel Allende"
        },
        {
            quote: "If you’re in the luckiest one per cent of humanity, you owe it to the rest of humanity to think about the other 99 per cent.",
            by: "― Warren Buffett"
        },
        {
            quote: "If you're not making someone else's life better, then you're wasting your time. Your life will become better by making other lives better.",
            by: "― Will Smith"
        },
        {
            quote: "Selfless giving is the art of living.",
            by: "― Frederic Lenz"
        },
        {
            quote: "The best way to find yourself is to lose yourself in the service of others.",
            by: "― Mahatma Gandhi"
        },
    ];
    const [currentQuoteIndex, setCurrentQuoteIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentQuoteIndex((prevIndex) => (prevIndex + 1) % qts.length);
        }, 10000);
        return () => clearInterval(interval);
    }, [qts.length]);

    return (
        <>
            <div className="frontpage_main1 flex flex-col w-auto items-center h-screen" style={{ padding: '1%', height: '92vh' }}>
                <div className="frontpape_part1 flex flex-col w-full h-full justify-between">

                    <div className="title flex justify-center" style={{ marginTop: '1.1%' }}>
                        <div className="t1 text-7xl font-bold">
                            <span className="inline-block">P</span><span className="inline-block">H</span><span className="inline-block">I</span><span className="inline-block">L</span><span className="inline-block">A</span><span className="inline-block">N</span><span className="inline-block">T</span><span className="inline-block">R</span><span className="inline-block">O</span>
                        </div>
                        <div className="t2 text-7xl font-bold">
                            <span className="inline-block">H</span><span className="inline-block">U</span><span className="inline-block">B</span>
                        </div>
                    </div>

                    <div className="front_content flex items-center justify-evenly w-full h-full">
                        <div className="picture w-2/5">
                            <div className="act_pic">
                                <img src={itachi} alt="" className="rounded-full" />
                            </div>
                        </div>
                        <div className="quotes w-2/5 flex items-center text-center justify-center" style={{ margin: '1%', padding: '1%' }}>
                            <div className="act_qot">
                                <h1 className="font-bold text-3xl">{qts[currentQuoteIndex].quote}</h1>
                                <p className="text-xl">{qts[currentQuoteIndex].by}</p>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </>
    );
}