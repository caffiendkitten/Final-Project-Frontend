/* eslint-disable */
// WARNING: DO NOT EDIT. This file is automatically generated by AWS Amplify. It will be overwritten.

const awsmobile = {
    "aws_project_region": "us-west-2",
    "aws_cognito_identity_pool_id": "us-west-2:72e293cb-ff01-4267-a81e-afab6f7ef6cc",
    "aws_cognito_region": "us-west-2",
    "aws_user_pools_id": "us-west-2_zkmlU3iKJ",
    "aws_user_pools_web_client_id": "5tjq20cpkdffs3rfc4qmqtkkqv",
    "oauth": {
        "domain": "finalprojectfrontend09a14ee309a14ee3-dev.auth.us-west-2.amazoncognito.com",
        "scope": [
            "phone",
            "email",
            "openid",
            "profile",
            "aws.cognito.signin.user.admin"
        ],
        "redirectSignIn": "https://finalprojectfrontend09a14ee309a14ee3/home/",
        "redirectSignOut": "https://finalprojectfrontend09a14ee309a14ee3/login/",
        "responseType": "token"
    },
    "federationTarget": "COGNITO_USER_POOLS",
    "aws_dynamodb_all_tables_region": "us-west-2",
    "aws_dynamodb_table_schemas": [
        {
            "tableName": "Userz-dev",
            "region": "us-west-2"
        }
    ],
    "aws_cloud_logic_custom": [
        {
            "name": "thizapi",
            "endpoint": "https://1t59x3yfv1.execute-api.us-west-2.amazonaws.com/dev",
            "region": "us-west-2"
        }
    ]
};


export default awsmobile;
