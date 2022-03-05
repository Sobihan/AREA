class Reaction {
  String name;
  List config;

  Reaction({required this.name, required this.config});
  factory Reaction.fromJson({required dynamic json}) {
    List _config = [];
    for (int i = 0; i < json['reactionArg'].length; i += 1) {
      if (json['reactionArg'][i]["key"] == "userToken") continue;
      _config.add(json['reactionArg'][i]);
    }
    return Reaction(name: json['reaction'] ?? "Null", config: _config);
  }

  @override
  String toString() {
    final Map<String, String> data = <String, String>{
      'Reaction Name': name,
      'Reaction Config': config.toString()
    };
    return data.toString();
  }

  void clean() {
    config.removeWhere((item) => item.toString() == "empty");
  }

  Reaction copy() {
    Reaction ne = Reaction(name: name, config: config);
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
