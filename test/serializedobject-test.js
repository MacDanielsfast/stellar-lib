var utils            = require('./testutils');
var assert           = require('assert');
var SerializedObject = utils.load_module('serializedobject').SerializedObject;

describe('Serialized object', function() {
  describe('Serialized object', function() {
    it('From json and back', function() {
      var input_json = {
        Account: 'g4qLSAzv4LZ9TLsR7diphGwKnSEAMQTSjS',
        Amount: '274579388',
        Destination: 'g4qLSAzv4LZ9TLsR7diphGwKnSEAMQTSjS',
        Fee: '15',
        Flags: 0,
        Paths: [[
          {
            account:   'g3kmLJN5D28dHuH8vZNUZpMC43pEHpaocV',
            currency:  'USD',
            issuer:    'g3kmLJN5D28dHuH8vZNUZpMC43pEHpaocV'
          },
          {
            currency: 'XRP'
          }
        ]],
        SendMax: {
          currency:  'USD',
          issuer:    'g4qLSAzv4LZ9TLsR7diphGwKnSEAMQTSjS',
          value:     '2.74579388'
        },
        Sequence: 351,
        SigningPubKey: '02854B06CE8F3E65323F89260E9E19B33DA3E01B30EA4CA172612DE77973FAC58A',
        TransactionType: 'Payment',
        TxnSignature: '30450221009DA3A42DD25E3B22EC45AD8BA8FC7A954264264A816D300B2DF69F814D7D4DD2022072C9627F97EEC6DA13DE841E06E2CD985EF06A0FBB15DDBF0800D0730C8986BF'
      };
      var output_json = SerializedObject.from_json(input_json).to_json();
      assert.deepEqual(input_json, output_json);
    });
  });
  describe('Format validation', function() {
    // Peercover actually had a problem submitting transactions without a `Fee`
    // and rippled was only informing of "transaction is invalid"
    it('should throw an Error when there is a missing field', function() {
      var input_json = {
        Account: 'g4qLSAzv4LZ9TLsR7diphGwKnSEAMQTSjS',
        Amount: '274579388',
        Destination: 'g4qLSAzv4LZ9TLsR7diphGwKnSEAMQTSjS',
        Sequence: 351,
        SigningPubKey: '02854B06CE8F3E65323F89260E9E19B33DA3E01B30EA4CA172612DE77973FAC58A',
        TransactionType: 'Payment',
        TxnSignature: '30450221009DA3A42DD25E3B22EC45AD8BA8FC7A954264264A816D300B2DF69F814D7D4DD2022072C9627F97EEC6DA13DE841E06E2CD985EF06A0FBB15DDBF0800D0730C8986BF'
      };
      assert.throws (
        function() {
          var output_json = SerializedObject.from_json(input_json);
        },
        /Payment is missing fields: \["Fee"\]/
      );
    });
  });
});

// vim:sw=2:sts=2:ts=8:et
