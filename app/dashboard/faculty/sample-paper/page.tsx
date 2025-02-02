import Image from "next/image"

export default function KMATDocument() {
    return (
        <div className="bg-white min-h-screen w-full p-6">
            <div className="max-w-[800px] mx-auto">
                <h1 className="text-2xl font-bold mb-2">Create New Exam</h1>
                <div className="w-full h-1 bg-blue-500 mb-6"></div>

                <div className="text-sm text-muted-foreground">4/4 Steps</div>


                <div className="bg-white rounded-sm border border-black aspect-[1/1.414] w-full relative">

                    <div className="p-8">

                        <div className="flex justify-between items-start mb-8">
                            <div className="space-y-1">
                                <h2 className="text-[24px] font-bold text-black">KMAT</h2>
                                <p className="text-[14px] text-gray-700">KSBL Management Admission Test</p>
                                <p className="text-[14px] text-gray-700">Sample Test</p>
                            </div>
                            <Image
                                src="/logo.png"
                                alt="KSBL Logo"
                                width={80}
                                height={80}
                                className="object-contain"
                                priority
                            />
                        </div>


                        <div className="space-y-6">
                            <p className="text-[14px] text-black leading-relaxed">
                                KMAT is a computer based test. This sample test is only to show sample questions to users at the time of
                                examination.
                            </p>

                            <ol className="list-decimal pl-5 space-y-2 text-[14px] text-black">
                                <li>General Section (30 Questions - 60 minutes)</li>
                                <li>Initial Section (30 Questions - 45 minutes)</li>
                                <li>Essay Writing (20 minutes)</li>
                            </ol>

                            <div className="space-y-4">
                                <p className="text-[14px] text-black font-medium">
                                    These questions in paper based format are to help applicants prepare for KMAT
                                </p>
                                <p className="text-[14px] text-black">
                                    Actual test will be done on computer. Test takers will be able to practice on the computer before
                                    start of the test to familiarize with the interface.
                                </p>
                                <p className="text-[14px] text-black font-bold">Answers are given on page 14 out of 26.</p>
                            </div>
                        </div>
                    </div>


                    <div className="absolute bottom-4 left-0 right-0 text-center">
                        <p className="text-[12px] text-gray-600">Page 1 of 20</p>
                    </div>
                </div>
            </div>
        </div>
    )
}