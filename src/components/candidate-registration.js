import React, { useState } from 'react';
import Web3 from 'web3';
import VotingContract from './artifacts/VotingContract.json';

const CandidateRegistration = () => {
    const [candidateName, setCandidateName] = useState('');
    const [account, setAccount] = useState('');

    const web3 = new Web3(Web3.givenProvider || "http://localhost:8545");
    
    const registerCandidate = async () => {
        const accounts = await web3.eth.getAccounts();
        setAccount(accounts[0]);
        
        const networkId = await web3.eth.net.getId();
        const deployedNetwork = VotingContract.networks[networkId];
        const contract = new web3.eth.Contract(VotingContract.abi, deployedNetwork.address);

        await contract.methods.addCandidate(candidateName).send({ from: account });
        alert('Candidato registrado com sucesso!');
        setCandidateName('');
    };

    return (
        <div>
            <h1>Registro de Candidatos</h1>
            <input 
                type="text" 
                value={candidateName} 
                onChange={(e) => setCandidateName(e.target.value)} 
                placeholder="Nome do Candidato" 
            />
            <button onClick={registerCandidate}>Registrar Candidato</button>
        </div>
    );
};

export default CandidateRegistration;