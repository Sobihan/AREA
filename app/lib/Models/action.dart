class Action {
  final String name;
  final List config;

  Action({required this.name, required this.config});
  factory Action.fromJson({required dynamic json}) {
    return Action(name: json['name'] ?? "Null", config: json['config'] ?? {});
  }

  @override
  String toString() {
    final Map<String, String> data = <String, String>{
      'Action Name': name,
      'Action Config': config.toString()
    };
    return data.toString();
  }
}
