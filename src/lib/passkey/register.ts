/**
 * Author: Ashwin Thinnappan
 * Created: 2023 Oct 25
 */

const RPID: string = "aslo38o9okdjw94i";

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

export const Passkey = async (name: string, displayName: string, rpId?: string, challenge?: string) => {
    if(name.length < 1 || displayName.length < 1) {
        console.log("Name or Display Name is empty");
        return null;
    }
    publicKeyCredentialCreationOptions.rp.id = window.location.hostname || rpId;
    publicKeyCredentialCreationOptions.user.id = Uint8Array.from(
        (challenge || RPID), c => c.charCodeAt(0)
        );
    publicKeyCredentialCreationOptions.user.name = ""
    let credential: Credential | null = null;
    publicKeyCredentialCreationOptions.user.displayName = displayName;
    publicKeyCredentialCreationOptions.user.name = name;

    try {
        credential = await navigator.credentials.create({
            publicKey: publicKeyCredentialCreationOptions
        });
    } catch (error) {
        console.error(error);
    } finally {
        return credential;
    }
};
