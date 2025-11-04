function Register({onActiveToLogin}){
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    return(
        <>
            <div className="h-screen w-full bg-cover flex items-center px-52 justify-between" style={{ backgroundImage: `url(${gambarLatar})` }}>
                <div className="text-6xl font-bold text-white">
                    <div>Daftar</div>
                    <div className="bg-linear-to-r from-[#FFB54D] via-[#FBF8F4] to-[#FFB54D] bg-clip-text text-transparent drop-shadow-md">SETARA</div>
                </div>
                <div className="w-[60%] bg-[#FFFFFF]/40 max-h-[400px] h-full px-12 flex items-center rounded-[40px]">
                    <div className="w-full  ">
                        <form className="space-y-8" action="">
                            <div className="space-y-4">
                                <Input 
                                    label="Username"
                                    type="text"
                                    placeholder="Masukkan Username"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                />
                                <Input 
                                    label="Password"
                                    type="text"
                                    placeholder="Masukkan Password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                            </div>
                            <div className="space-y-2">
                                <Button
                                    text="Masuk"
                                />
                                <div className="text-sm font-bold text-white">
                                    Belum punya akun ? <span className="text-[#FF9500] text-sm font-bold">Daftar</span>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Register