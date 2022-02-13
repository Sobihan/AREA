class Reaction {
  String name;
  List config;

  Reaction({required this.name, required this.config});
  factory Reaction.fromJson({required dynamic json}) {
    return Reaction(name: json['name'] ?? "Null", config: json['config'] ?? {});
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
}
