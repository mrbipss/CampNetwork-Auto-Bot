// Chuyển sang Node.js

const quests = {
    'Twitter Follows': [
        {
            '2660f24a-e3ac-4093-8c16-7ae718c00731': ['Follow Camp Network on X', 1582415049007800322]
        },
        {
            '01bc9433-359f-4403-9bc8-4295d47dc3c8': ['Follow Bleetz on X', 968162622028861440]
        },
        {
            '39b41034-ce80-4057-8cca-e95992182f04': ['Follow Kraft on X', 1377135825561915392]
        },
        {
            '87c040a3-060a-4000-b271-051603417e8b': ['Follow RewardedTV on X', 1858536849699987456]
        },
        {
            '5f03c7d8-8ee0-443f-a0ad-8fda68dfecd8': ['Follow ScorePlay on X', 1739331570429747200]
        },
        {
            '17681189-fd69-4aa3-b533-8f452c1bab0c': ['Follow Cristal on X', 1089957066]
        },
        {
            '4cebe3ff-4dae-4858-9323-8b669d80e45c': ['Follow StoryChain on X', 1700882926089424896]
        },
        {
            '12b177a5-aa4e-47c6-aaa9-b14bf9481d0a': ['Follow SummitX on X', 1893249842526244864]
        },
        {
            'cf5a23b1-d48c-4ab9-a74c-785394158224': ['Follow Token Tails on X', 1769745217056387072]
        },
        {
            '42936f26-3ec6-401f-8ed0-62af343f1fc4': ['Follow Wide Worlds on X', 1753282402422751233]
        },
        {
            'b852ec9b-7af5-4f07-a677-1bc630bf4579': ['Follow ARCOIN on X', 1807083872800354304]
        },
        {
            'c7d0e2c8-87e7-46df-81f3-48f311735c22': ['Follow Clusters on X', 1699407750298492928]
        },
        {
            '02e3d5b3-e65e-41c8-b159-405f48255cdf': ['Follow JukeBlox on X', 1862216008792002560]
        },
        {
            '040ead29-7436-4457-b7cd-8bd2a8855a49': ['Follow Panenka FC on X', 1709136004916117504]
        },
        {
            '009c0d38-dc3c-4d37-b558-38ece673724a': ['Follow Pixudi on X', 1538531617685258241]
        },
        {
            '242ab4dc-2df4-4b97-bcd7-b013ff6635a1': ['Follow WW Pets on X', 1874938653744508928]
        },
        {
            'beb6df6d-b225-46e5-8a4f-20ad967fb4a8': ['Follow EntertainM on X', 1487501359326892034]
        },
        {
            'e47be0b8-eedc-445e-a53e-b2f05daabe3c': ['Follow WW Chronicle on X', 1869153293538148353]
        },
        {
            '1a81cbe5-a792-4921-baa0-0c36165e0d7c': ['Follow AWANA on X', 1784651286719193088]
        },
        {
            '4e467350-a49b-4413-8fce-4d424d3303bb': ['Follow Pictographs on X', 1615813996501733389]
        },
        {
            'e71a8c69-36b3-46fb-9a26-b6e0d4757d1d': ['Follow Merv on X', 1826623713216692224]
        },
        {
            '0bb973c0-fa9d-4779-829d-ef18a8fbd3b0': ['Follow Merv Toon on X', 1917871653742321664]
        },
    ]
};

const twitter_quests = [
    '2660f24a-e3ac-4093-8c16-7ae718c00731',
    '39b41034-ce80-4057-8cca-e95992182f04',
    '87c040a3-060a-4000-b271-051603417e8b',
    '5f03c7d8-8ee0-443f-a0ad-8fda68dfecd8',
    '17681189-fd69-4aa3-b533-8f452c1bab0c',
    '4cebe3ff-4dae-4858-9323-8b669d80e45c',
    '12b177a5-aa4e-47c6-aaa9-b14bf9481d0a',
    'cf5a23b1-d48c-4ab9-a74c-785394158224',
    '42936f26-3ec6-401f-8ed0-62af343f1fc4',
    'b852ec9b-7af5-4f07-a677-1bc630bf4579',
    'c7d0e2c8-87e7-46df-81f3-48f311735c22',
    '02e3d5b3-e65e-41c8-b159-405f48255cdf',
    '040ead29-7436-4457-b7cd-8bd2a8855a49',
    '009c0d38-dc3c-4d37-b558-38ece673724a',
    '242ab4dc-2df4-4b97-bcd7-b013ff6635a1',
    'beb6df6d-b225-46e5-8a4f-20ad967fb4a8',
    'e47be0b8-eedc-445e-a53e-b2f05daabe3c',
    '1a81cbe5-a792-4921-baa0-0c36165e0d7c',
    '4e467350-a49b-4413-8fce-4d424d3303bb',
    '01bc9433-359f-4403-9bc8-4295d47dc3c8',
    'e71a8c69-36b3-46fb-9a26-b6e0d4757d1d',
    '0bb973c0-fa9d-4779-829d-ef18a8fbd3b0'
];

const telegram_quests = [
    ['46a1b202-ab7b-4c29-bf13-417c6a8267af', 'Join the JukeBlox Telegram Community'],
    ['9f8edb41-4867-48e0-8d7a-8437c2c6e1b1', 'Join the Pixudi Telegram Community'],
    ['06b0d411-c1df-4cc5-a72c-e47dc911a0b3', 'Join the Token Tails Telegram Community'],
    ['aa08b2a5-eaab-469c-9e6f-e3a380c23faa', 'Join the ARCOIN Community on Telegram'],
    ['be50eaa0-945a-4664-8d07-a2f02167cf38', 'Join the Panenka FC Community on Telegram'],
    ['9b87193e-c568-4a72-915d-1bdba060b00e', 'Join Awana Telegram Community'],
    ['2233dcaa-a2be-49fb-b322-28bf9d387475', 'Join the Pictographs Community'],
    ['2ba6c29a-69a1-4ff8-ac61-f4b19431f8d2', 'Add the PictoBot'],
    ['861e2917-3725-48ba-b8b9-4466cd81fe72', 'Join the SummitX Telegram'],
];

const discord_quests = [
    ['d7a3a18b-38fd-45d5-937a-f974dff403bd', 'Join the RewardedTV Discord'],
    ['4345ec66-0746-4a77-85d0-a79db42612b1', 'Join the StoryChain Discord'],
    ['f4de4fa8-ad5c-45c9-a804-0483309de9f9', 'Join the Kraft Discord Community'],
    ['e7c0f882-82b7-499e-8a05-40528e0047ee', 'Join the ScorePlay Community'],
    ['3dfca204-edf2-461a-8fda-4067b09241a7', 'Join the SummitX Community']
];

const other_quests = [
    ['3ea83621-0087-4fc1-9967-c21265e2c369', 'Claim your CampID on Clusters'],
    ['10668db1-081d-40e2-9f42-06fafc67e4aa', 'Create your mID on Bleetz'],
    ['2585eb2f-7cac-45d1-88db-13608762bf17', 'Connect your Socials to Camp'],
    ['d4fdee29-c60f-40f2-8795-1da0e9e5414e', 'Create a Cristal account'],
    ['211c9b79-ff65-42f8-a59a-ad0539129aa9', 'Check out SummitX Camp DeFi app'],
    ['e6eda663-977e-4d71-a03c-a1020db88064', 'Create a Belgrano account'],
    ['541ff274-95c5-409a-9ea2-c80ec2719d7e', 'Check out the Camp Stories Page'],
    ['76c8b53b-f9c1-4019-bfe0-ad8d63cc297f', 'Complete Battlepass on EntertainM'],
    ['f79ec3f2-e26c-4f39-a384-75101910b168', "Complete Rex's Chronicles"],
    ['22961490-86f1-4705-911e-603f8f4b4892', 'Lend and Borrow in SummitX'],
    ['978cb2ba-6f2d-4b65-a2c1-6e29c7dacd25', "Complete Whispy's Tales"]
];

module.exports = {
    quests,
    twitter_quests,
    telegram_quests,
    discord_quests,
    other_quests
}; 