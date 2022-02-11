List<Map<String, dynamic>> actions = [
  {
    "ActionName": "actionName1",
    "config": [
      {"ConfigName1": "value1"},
      {"ConfigName2": "value2"}
    ]
  },
  {
    "ActionName": "actionName2",
    "config": [
      {"ConfigName1": "value1"},
      {"ConfigName2": "value2"}
    ]
  },
  {
    "ActionName": "actionName3",
    "config": [
      {"ConfigName1": "value1"},
      {"ConfigName2": "value2"}
    ]
  }
];

List<Map<String, dynamic>> actionFromJson(dynamic json) {
  List<Map<String, dynamic>> actions = [];
  int size = json['jsonArr'].length;
  for (int i = 0; i < size; i += 1) {
    if (json['jsonArr'][i]["actions"] == null) {
      continue;
    }
    for (int j = 0; j < json['jsonArr'][i]["actions"].length; j += 1) {
      actions.add({
        "ActionName": json['jsonArr'][i]["actions"][j]["name"],
        "config": json['jsonArr'][i]["actions"][j]["args"]
      });
    }
  }
  return actions;
}
