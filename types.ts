export type TTerms = {
    term:string
}

export type TAlert = {
    message:boolean,
    listing:boolean,
    order:boolean
}

export type TNotification = {
    belongsToUser:string,
    notification:string,
    listingID:string,
    messageID:string
}

export type TReview = {
    _id:string,
    reviewedUser:string,
    reviewer:string,
    isPositive:boolean,
    comment:string,
    reply:string,
    listingID:string
}

export type TSpecifications ={
    cpuMake?:string,
    cpuModel?:string,
    cpuSpeed?:string,
    gpuMake?:string,
    gpuModel?:string,
    gpuSpeed?:string,
    gpuRam?:string,
    mbMake?:string,
    mbModel?:string,
    ramSpeed?:string,
    ramMake?:string,
    ramModel?:string,
    ramAmount?:string,
    
    ram?:[{
        ramMake?:string,
        ramModel?:string,
        ramSpeed?:string,
        ramAmount?:string
    }],
    psuMake?:string,
    psuModel?:string,
    psuPower?:string,
    memoryMake?:string,
    memoryModel?:string,
    memoryAmount?:string,
    memoryType?:string
    memory:[{
        memoryMake?:string,
        memoryModel?:string,
        memorySpeed?:string,
        memoryAmount?:string,
        memoryType?:string
    }],
    screenResolution?:string,
    batterySize?:string
}

export type TPhoneSpecifications = {
    phoneMake?:string,
    phoneColor?:string,
    phoneRamSize?:string,
    phoneMemorySize?:string,
}

export type TListing = {
    _id:string,
    sellerUsername:string,
    type:string,
    state:string,
    orderState:string,
    specifications:TSpecifications
    title:string,
    description?:string,
    views:number,
    follows?:number,
    reviews?:TReview[],
    price:number,
    originalProductLink?:string,
    images:[],
    isOverclocked?:boolean,
    useCase?:string,
    sellerPaysTransport?:boolean,
    isCollection:boolean,
    amountOfAvailableGoods:number[],
    flags:string[],

    isPromotedTop:boolean,
    isPromotedHome:boolean,
    isReviewed:boolean,
    followedBy:[string]
}

export type TFilter = {
    cpuMake?:string,
    cpuModel?:string,
    minCpuSpeed?:string,
    gpuMake?:string,
    gpuModel?:string,
    gpuRam?:string,
    mbMake?:string,
    mbModel?:string,
    ramMake?:string,
    ramModel?:string,
    minRamSpeed?:string,
    minRamSize?:string,
    psuModel?:string,
    memoryMake?:string,
    memoryModel?:string,
    memorySpeed?:string,
    minMemoryAmount?:string,
    memoryType?:string,
    screenResolution?:string,
    batterySize?:string,

    phoneMake?:string,
    phoneColor?:string,
    phoneRamSize?:string,
    phoneMemorySize?:string

    listingType?:string,
    state?:string,
    city?:string,
    priceMin?:string,
    priceMax?:string,
    _id:string
}

export type TMessage = {
    _id:string,
    usernameA:string,
    usernameB:string,
    messages:[{message:string,seen:boolean,dateSeen:string,sender:string}],
    listingID:string,
    deleted:boolean
}

export type TUser = {
    username:string
    email?:string,
    firstName?:string,
    lastName?:string,
    idDocument?:string,
    idReg?:string,
    phoneNumber?:string,
    views:number,
    reputation:number,
    reviews?:TReview[],
    accCreationDate:string,
    soldAmount:number,
    verifiedSeller:boolean,
    rank:string,
    city:string,
    address?:string,
    companyName?:string,
    companyLink?:string,
    followedFilters?:TFilter[],
    addressBook?:TAddressBook[],

    isAdmin:boolean,
    isOwner:boolean
}

export const DEBUG = true;