List<Map<String, dynamic>> reactions = [
  {
    "ReactionName": "ReactionName1",
    "config": [
      {"ConfigName1": "value1"},
      {"ConfigName2": "value2"}
    ]
  },
  {
    "ReactionName": "ReactionName2",
    "config": [
      {"ConfigName1": "value1"},
      {"ConfigName2": "value2"},
      {"ConfigName2": "value3"}
    ]
  },
  {
    "ReactionName": "ReactionName3",
    "config": [
      {"ConfigName1": "value1"},
    ]
  }
];

List<Map<String, dynamic>> reactionFromJson(dynamic json) {
  List<Map<String, dynamic>> reactions = [];
  int size = json['jsonArr'].lenght;
  for (int i = 0; i < size; i += 1) {
    if (json['jsonArr'][i]["reactions"] == null) {
      continue;
    }
    reactions.add({
      "reactionName": json['jsonArr'][i]["reactions"]["name"],
      "config": json['jsonArr'][i]["reactions"]["args"]
    });
  }
  return reactions;
}
