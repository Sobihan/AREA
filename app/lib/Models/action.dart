class CustomAction {
  String name;
  List config;

  CustomAction({required this.name, required this.config});
  factory CustomAction.fromJson({required dynamic json}) {
    List _config = [];
    for (int i = 0; i < json['actionArg'].length; i += 1) {
      if (json['actionArg'][i]["key"] == "userToken") continue;
      _config.add(json['actionArg'][i]);
    }
    return CustomAction(name: json['action'] ?? "Null", config: _config);
  }

  @override
  String toString() {
    final Map<String, String> data = <String, String>{
      'Action Name': name,
      'Action Config': config.toString()
    };
    return data.toString();
  }

  void clean() {
    config.removeWhere((item) => item.toString() == "empty");
  }

  CustomAction copy() {
    CustomAction ne = CustomAction(name: name, config: config);
    return ne;
  }

  void transform() {
    for (int i = 0; i < config.length; i += 1) {
      List<String> keys = config[i].keys.toList();
      if (keys.length == 1) continue;
      config[i] = {config[i]["key"]: config[i]["value"]};
    }
  }
}
