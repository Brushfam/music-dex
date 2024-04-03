'use client'

import { createWeb3Modal, defaultConfig } from '@web3modal/ethers5/react'

const projectId = 'd2b583ed37648f394931da4a75f4edb1'

const mainnet = {
    chainId: 137,
    name: 'Polygon Mainnet',
    currency: 'MATIC',
    explorerUrl: 'https://polygonscan.com/',
    rpcUrl: 'https://polygon-rpc.com/'
}

const metadata = {
    name: 'MusicDex',
    description: 'Invest in Music Royalties and Shape the Future of Music',
    url: 'https://musicdex.co/',
    icons: ['https://musicdex.co/favicon.ico']
}

const ethersConfig = defaultConfig({
    metadata,
})

createWeb3Modal({
    ethersConfig,
    chains: [mainnet],
    projectId,
    enableAnalytics: true, // Optional - defaults to your Cloud configuration
    allWallets: "HIDE",
    featuredWalletIds: [
        'c57ca95b47569778a828d19178114f4db188b89b763c899ba0be274e97267d96',
        '4622a2b2d6af1c9844944291e5e7351a6aa24cd7b23099efac1b2fd875da31a0',
        '4622a2b2d6af1c9844944291e5e7351a6aa24cd7b23099efac1b2fd875da31a0',
        '225affb176778569276e484e1b92637ad061b01e13a048b35a9d280c3b58970f',
        '1ae92b26df02f0abca6304df07debccd18262fdf5fe82daa81593582dac9a369',
        'ecc4036f814562b41a5268adc86270fba1365471402006302e70169465b7ac18',
        '8a0ee50d1f22f6651afcae7eb4253e52a3310b90af5daef78a8c4929a9bb99d4'
    ],
    includeWalletIds: [
        'c57ca95b47569778a828d19178114f4db188b89b763c899ba0be274e97267d96',
        '4622a2b2d6af1c9844944291e5e7351a6aa24cd7b23099efac1b2fd875da31a0',
        '4622a2b2d6af1c9844944291e5e7351a6aa24cd7b23099efac1b2fd875da31a0',
        '225affb176778569276e484e1b92637ad061b01e13a048b35a9d280c3b58970f',
        '1ae92b26df02f0abca6304df07debccd18262fdf5fe82daa81593582dac9a369',
        'ecc4036f814562b41a5268adc86270fba1365471402006302e70169465b7ac18',
        '8a0ee50d1f22f6651afcae7eb4253e52a3310b90af5daef78a8c4929a9bb99d4'
    ],
    excludeWalletIds: [
        '9ce87712b99b3eb57396cc8621db8900ac983c712236f48fb70ad28760be3f6a'
    ]
})

interface Web3ModalProps {
    children: React.ReactNode
}

export function Web3Modal({ children }: Web3ModalProps) {
    return children
}