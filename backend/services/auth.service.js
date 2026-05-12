const {
    findUserByEmail, 
    createUser, 
    createSession,
} = require("../repository/auth.repository");

const {
    generateAccessToken,
    generateRefreshToken, 
    verifyRefreshToken
} = require("../utils/jwt");

const {
    ConflictError
} = require("../utils/error.js");


const signup = async ( {username, email, password } ) => {
    //  first hum check kar le ki user exists kara ta h ya nahi
    const ExistingUser = await findUserByEmail({ email });
    
    // agar nahi karta tho error return kar de ge
    if(ExistingUser){
        throw new ConflictError("email is already exists..");
    }

    //  the hum user ko create kar le ge and password ko hum pre has kar rahe h model me
    const user = createUser({
        username,
        email, 
        password
    });

    // then access token generate kar le
    const acccessToken = generateAccessToken({
        userId: user._id, 
        role: user.role
    });

    //  then hum refreshToken ko regnerate kar ge
    
    const refreshToken = generateRefreshToken({
        user: user._id,
    })

    // then hum session create kar le session
    await createSession({
        user: user._id, 
        refreshToken
    })

    //  then hum boxevent create kar de le
    await createOutboxEvent({
        eventType: "UserRegistered",
        payload: {
            userId: user._id,
            email: user.email,
        },
        status: "PENDING"
    });
    
    return (
        user, 
        accessToken, 
        refreshToken
    )
};

const login = ({ email, password }) => {
    const user = await findUserByEmail(email)
        .select("+password");
    
    if(!user){
        throw new UnauthorizedError("Invalid credintials");
    }
    const iscomparepassword = await user.comparePassword(password);

    if(!iscomparepassword){
        throw new UnauthorizedError("Invalid credintials");
    };

    const acccessToken = generateAccessToken({
        userId: user._id, 
        role: user.role
    });

    const refreshToken = generateRefreshToken({
        userId: user._id, 
    });

    await createSession({
        user: user._id, 
        refreshToken
    })
    await createOutboxEvent({
        eventType: "UserLoggedIn",
        payload: {
            userId: user._id,
            email: user.email,
        },
        status: "PENDING"
    });

    return {
        user, 
        accessToken, 
        refreshToken,
    };
};

const refreshTokenService = async (refreshToken) => {
    
    const decode = await verifyRefreshToken(refreshToken);
    
    const session = findSessionByToken(refreshToken);

    if (!session) {
        throw new UnauthorizedError("Invalid refresh token");
    }

    
}