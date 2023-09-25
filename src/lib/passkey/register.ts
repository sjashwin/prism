/**
 * Author: Ashwin Thinnappan
 * Created: 2023 Oct 25
 */
import bcrypt from 'bcrypt';

const publicKeyCredentialCreationOptions: PublicKeyCredentialCreationOptions = {
    challenge: Uint8Array.from(
        "asjwiendoaskd", c => c.charCodeAt(0)),
    rp: {
        name: "Prism Sec",
    },
    user: {
        id: Uint8Array.from(
            "UZSL85T9AFC", c => c.charCodeAt(0)),
        name: "",
        displayName: ""
    },
    pubKeyCredParams: [{alg: -7, type: "public-key"}],
    authenticatorSelection: {
        authenticatorAttachment: "cross-platform",
    },
    timeout: 60000,
    attestation: "direct" as const
};

export const Passkey = async (name: string, displayName: string, rpId?: string) => {
    let credential: Credential | null = null;

    if (name.length < 1 || displayName.length < 1) {
        console.log("Name or Display Name is empty");
        return null;
    }

    try {
        bcrypt.hash(new Date().toString().concat(name), 4, (err, hash) => {
            if (err) {
                console.error(err);
                return null;
            }
            publicKeyCredentialCreationOptions.challenge = Uint8Array.from(hash, c => c.charCodeAt(0));
            publicKeyCredentialCreationOptions.user.id = Uint8Array.from(hash, c => c.charCodeAt(0));
        });

        publicKeyCredentialCreationOptions.rp.id = location.hostname || rpId;
        publicKeyCredentialCreationOptions.user.name = ""
        
        publicKeyCredentialCreationOptions.user.displayName = displayName;
        publicKeyCredentialCreationOptions.user.name = name;

        credential = await navigator.credentials.create({
            publicKey: publicKeyCredentialCreationOptions
        });
        
    } catch (error) {
        console.error(error);
    } finally {
        return credential;
    }
};
