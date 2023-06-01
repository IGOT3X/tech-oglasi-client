const MobileBack = () =>{
    return(
            <div className="sm:hidden flex items-center p-5 text-mint">
                <a href="/"><img className="2xl:w-[36px] cursor-pointer" src="back-arrow.svg" alt="" /></a>
                <h1 className="text-[24px] 2xl:text-[36px] font-semibold w-full text-center">Tech Oglasi</h1>
                <div className="w-[24px] 2xl:w-[36px]"></div>
            </div>
    )
}

export default MobileBack;