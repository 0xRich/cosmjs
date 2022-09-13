import { AminoConverters } from "../../aminotypes";
import { AminoMsg } from "@cosmjs/amino";
//import { MsgGrant, MsgExec, MsgRevoke } from "cosmjs-types/cosmos/gov/v1beta1/tx";

export function isAminoMsgGrant(msg: AminoMsg) {
  return msg.type === "cosmos-sdk/MsgGrant";
}

export function isAminoMsgExec(msg: AminoMsg) {
  return msg.type === "cosmos-sdk/MsgExec";
}

export function isAminoMsgRevoke(msg: AminoMsg) {
  return msg.type === "cosmos-sdk/MsgRevoke";
}

export function createAuthzAminoConverters(): AminoConverters {
  return {
    "/cosmos.authz.v1beta1.MsgGrant": {
        aminoType: "cosmos-sdk/MsgGrant",
        toAmino: ({ granter, grantee, grant }) => {

            let authorization = {
                //type: "cosmos-sdk/GenericAuthorization", commented out as cosmos 0.45 not supporting this typeUrl yet
                //need to call protobuf coverter
                msg: "/cosmos.bank.v1beta1.MsgSend"
            };

            return {
                granter: granter,
                grantee: grantee,
                grant: {
                    authorization: authorization, 
                    expiration: (new Date(grant.expiration.seconds * 1000)).toISOString().slice(0,19)+'Z'
                    //correct format - need to remove .000 -> expiration: "2020-12-31T17:00:00Z"
                }
            };
    
        },
        fromAmino: ({ granter, grantee,  grant }) => {/*       
            // not being execute - need to modify from Amino in Aminotype.js first
        */
        },
    },
    "/cosmos.authz.v1beta1.MsgExec": "not_supported_by_chain",
    "/cosmos.authz.v1beta1.MsgRevoke": "not_supported_by_chain",
};
}
