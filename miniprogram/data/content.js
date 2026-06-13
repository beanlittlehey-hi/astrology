const tarotDeck = [
  {
    "id": "fool",
    "name": "愚者",
    "suit": "major",
    "arcana": "major",
    "image": "/packages/tarot-assets/assets/tarot/00-the-fool.jpg",
    "keywords": [
      "开始",
      "自由",
      "尝试"
    ],
    "upright": "这张牌指向新的旅程、初心、轻装前行。它提醒你先看见这个阶段的核心主题，再决定下一步。",
    "reversed": "逆位时，它更像是在提示冲动、失焦、还没看清代价。先修正节奏，不急着给事情下结论。",
    "loveReading": "在感情里，愚者更强调新的旅程、初心、轻装前行。你可以先看见关系中的真实需求，而不是只追问一个确定答案。",
    "workReading": "在工作和现实选择里，愚者提示新的旅程、初心、轻装前行。适合把想法变成可执行的下一步。",
    "healingReading": "在疗愈层面，愚者邀请你回到自己身上，承认开始正在成为此刻的功课。",
    "actionAdvice": "今天先围绕“开始”做一个低风险小行动，并在晚些时候回看感受。"
  },
  {
    "id": "magician",
    "name": "魔术师",
    "suit": "major",
    "arcana": "major",
    "image": "/packages/tarot-assets/assets/tarot/01-the-magician.jpg",
    "keywords": [
      "行动",
      "表达",
      "资源"
    ],
    "upright": "这张牌指向主动创造、整合资源、把想法落地。它提醒你先看见这个阶段的核心主题，再决定下一步。",
    "reversed": "逆位时，它更像是在提示空有想法、时机未熟、表达和行动脱节。先修正节奏，不急着给事情下结论。",
    "loveReading": "在感情里，魔术师更强调主动创造、整合资源、把想法落地。你可以先看见关系中的真实需求，而不是只追问一个确定答案。",
    "workReading": "在工作和现实选择里，魔术师提示主动创造、整合资源、把想法落地。适合把想法变成可执行的下一步。",
    "healingReading": "在疗愈层面，魔术师邀请你回到自己身上，承认行动正在成为此刻的功课。",
    "actionAdvice": "今天先围绕“行动”做一个低风险小行动，并在晚些时候回看感受。"
  },
  {
    "id": "high-priestess",
    "name": "女祭司",
    "suit": "major",
    "arcana": "major",
    "image": "/packages/tarot-assets/assets/tarot/02-the-high-priestess.jpg",
    "keywords": [
      "直觉",
      "沉静",
      "观察"
    ],
    "upright": "这张牌指向内在直觉、秘密、等待答案浮现。它提醒你先看见这个阶段的核心主题，再决定下一步。",
    "reversed": "逆位时，它更像是在提示忽略直觉、信息不透明、过度猜测。先修正节奏，不急着给事情下结论。",
    "loveReading": "在感情里，女祭司更强调内在直觉、秘密、等待答案浮现。你可以先看见关系中的真实需求，而不是只追问一个确定答案。",
    "workReading": "在工作和现实选择里，女祭司提示内在直觉、秘密、等待答案浮现。适合把想法变成可执行的下一步。",
    "healingReading": "在疗愈层面，女祭司邀请你回到自己身上，承认直觉正在成为此刻的功课。",
    "actionAdvice": "今天先围绕“直觉”做一个低风险小行动，并在晚些时候回看感受。"
  },
  {
    "id": "empress",
    "name": "女皇",
    "suit": "major",
    "arcana": "major",
    "image": "/packages/tarot-assets/assets/tarot/03-the-empress.jpg",
    "keywords": [
      "滋养",
      "照顾",
      "丰盛"
    ],
    "upright": "这张牌指向滋养、吸引力、关系里的照顾与承接。它提醒你先看见这个阶段的核心主题，再决定下一步。",
    "reversed": "逆位时，它更像是在提示过度付出、依赖外界肯定、能量外流。先修正节奏，不急着给事情下结论。",
    "loveReading": "在感情里，女皇更强调滋养、吸引力、关系里的照顾与承接。你可以先看见关系中的真实需求，而不是只追问一个确定答案。",
    "workReading": "在工作和现实选择里，女皇提示滋养、吸引力、关系里的照顾与承接。适合把想法变成可执行的下一步。",
    "healingReading": "在疗愈层面，女皇邀请你回到自己身上，承认滋养正在成为此刻的功课。",
    "actionAdvice": "今天先围绕“滋养”做一个低风险小行动，并在晚些时候回看感受。"
  },
  {
    "id": "emperor",
    "name": "皇帝",
    "suit": "major",
    "arcana": "major",
    "image": "/packages/tarot-assets/assets/tarot/04-the-emperor.jpg",
    "keywords": [
      "秩序",
      "边界",
      "掌控"
    ],
    "upright": "这张牌指向结构、责任、边界和稳定秩序。它提醒你先看见这个阶段的核心主题，再决定下一步。",
    "reversed": "逆位时，它更像是在提示控制欲、僵硬、害怕失去主导权。先修正节奏，不急着给事情下结论。",
    "loveReading": "在感情里，皇帝更强调结构、责任、边界和稳定秩序。你可以先看见关系中的真实需求，而不是只追问一个确定答案。",
    "workReading": "在工作和现实选择里，皇帝提示结构、责任、边界和稳定秩序。适合把想法变成可执行的下一步。",
    "healingReading": "在疗愈层面，皇帝邀请你回到自己身上，承认秩序正在成为此刻的功课。",
    "actionAdvice": "今天先围绕“秩序”做一个低风险小行动，并在晚些时候回看感受。"
  },
  {
    "id": "hierophant",
    "name": "教皇",
    "suit": "major",
    "arcana": "major",
    "image": "/packages/tarot-assets/assets/tarot/05-the-hierophant.jpg",
    "keywords": [
      "传统",
      "信念",
      "指导"
    ],
    "upright": "这张牌指向信念系统、承诺、规则和成熟建议。它提醒你先看见这个阶段的核心主题，再决定下一步。",
    "reversed": "逆位时，它更像是在提示被规则限制、过度依赖权威、缺少自己的判断。先修正节奏，不急着给事情下结论。",
    "loveReading": "在感情里，教皇更强调信念系统、承诺、规则和成熟建议。你可以先看见关系中的真实需求，而不是只追问一个确定答案。",
    "workReading": "在工作和现实选择里，教皇提示信念系统、承诺、规则和成熟建议。适合把想法变成可执行的下一步。",
    "healingReading": "在疗愈层面，教皇邀请你回到自己身上，承认传统正在成为此刻的功课。",
    "actionAdvice": "今天先围绕“传统”做一个低风险小行动，并在晚些时候回看感受。"
  },
  {
    "id": "lovers",
    "name": "恋人",
    "suit": "major",
    "arcana": "major",
    "image": "/packages/tarot-assets/assets/tarot/06-the-lovers.jpg",
    "keywords": [
      "连接",
      "选择",
      "真实需求"
    ],
    "upright": "这张牌指向亲密连接、价值选择、看见真实需求。它提醒你先看见这个阶段的核心主题，再决定下一步。",
    "reversed": "逆位时，它更像是在提示关系错位、选择困难、只看感觉不看事实。先修正节奏，不急着给事情下结论。",
    "loveReading": "在感情里，恋人更强调亲密连接、价值选择、看见真实需求。你可以先看见关系中的真实需求，而不是只追问一个确定答案。",
    "workReading": "在工作和现实选择里，恋人提示亲密连接、价值选择、看见真实需求。适合把想法变成可执行的下一步。",
    "healingReading": "在疗愈层面，恋人邀请你回到自己身上，承认连接正在成为此刻的功课。",
    "actionAdvice": "今天先围绕“连接”做一个低风险小行动，并在晚些时候回看感受。"
  },
  {
    "id": "chariot",
    "name": "战车",
    "suit": "major",
    "arcana": "major",
    "image": "/packages/tarot-assets/assets/tarot/07-the-chariot.jpg",
    "keywords": [
      "推进",
      "意志",
      "方向"
    ],
    "upright": "这张牌指向目标明确、意志集中、推动事情向前。它提醒你先看见这个阶段的核心主题，再决定下一步。",
    "reversed": "逆位时，它更像是在提示方向拉扯、急于证明、用力过猛。先修正节奏，不急着给事情下结论。",
    "loveReading": "在感情里，战车更强调目标明确、意志集中、推动事情向前。你可以先看见关系中的真实需求，而不是只追问一个确定答案。",
    "workReading": "在工作和现实选择里，战车提示目标明确、意志集中、推动事情向前。适合把想法变成可执行的下一步。",
    "healingReading": "在疗愈层面，战车邀请你回到自己身上，承认推进正在成为此刻的功课。",
    "actionAdvice": "今天先围绕“推进”做一个低风险小行动，并在晚些时候回看感受。"
  },
  {
    "id": "strength",
    "name": "力量",
    "suit": "major",
    "arcana": "major",
    "image": "/packages/tarot-assets/assets/tarot/08-strength.jpg",
    "keywords": [
      "温柔坚定",
      "耐心",
      "边界"
    ],
    "upright": "这张牌指向温柔的力量、耐心、稳定情绪。它提醒你先看见这个阶段的核心主题，再决定下一步。",
    "reversed": "逆位时，它更像是在提示压抑感受、缺少自信、边界被消耗。先修正节奏，不急着给事情下结论。",
    "loveReading": "在感情里，力量更强调温柔的力量、耐心、稳定情绪。你可以先看见关系中的真实需求，而不是只追问一个确定答案。",
    "workReading": "在工作和现实选择里，力量提示温柔的力量、耐心、稳定情绪。适合把想法变成可执行的下一步。",
    "healingReading": "在疗愈层面，力量邀请你回到自己身上，承认温柔坚定正在成为此刻的功课。",
    "actionAdvice": "今天先围绕“温柔坚定”做一个低风险小行动，并在晚些时候回看感受。"
  },
  {
    "id": "hermit",
    "name": "隐士",
    "suit": "major",
    "arcana": "major",
    "image": "/packages/tarot-assets/assets/tarot/09-the-hermit.jpg",
    "keywords": [
      "独处",
      "内省",
      "答案"
    ],
    "upright": "这张牌指向独处思考、寻找内在答案、放慢节奏。它提醒你先看见这个阶段的核心主题，再决定下一步。",
    "reversed": "逆位时，它更像是在提示封闭自己、逃避沟通、过度孤立。先修正节奏，不急着给事情下结论。",
    "loveReading": "在感情里，隐士更强调独处思考、寻找内在答案、放慢节奏。你可以先看见关系中的真实需求，而不是只追问一个确定答案。",
    "workReading": "在工作和现实选择里，隐士提示独处思考、寻找内在答案、放慢节奏。适合把想法变成可执行的下一步。",
    "healingReading": "在疗愈层面，隐士邀请你回到自己身上，承认独处正在成为此刻的功课。",
    "actionAdvice": "今天先围绕“独处”做一个低风险小行动，并在晚些时候回看感受。"
  },
  {
    "id": "wheel-of-fortune",
    "name": "命运之轮",
    "suit": "major",
    "arcana": "major",
    "image": "/packages/tarot-assets/assets/tarot/10-wheel-of-fortune.jpg",
    "keywords": [
      "变化",
      "周期",
      "转机"
    ],
    "upright": "这张牌指向周期转动、变化、时机正在移动。它提醒你先看见这个阶段的核心主题，再决定下一步。",
    "reversed": "逆位时，它更像是在提示抗拒变化、重复旧模式、把选择交给外界。先修正节奏，不急着给事情下结论。",
    "loveReading": "在感情里，命运之轮更强调周期转动、变化、时机正在移动。你可以先看见关系中的真实需求，而不是只追问一个确定答案。",
    "workReading": "在工作和现实选择里，命运之轮提示周期转动、变化、时机正在移动。适合把想法变成可执行的下一步。",
    "healingReading": "在疗愈层面，命运之轮邀请你回到自己身上，承认变化正在成为此刻的功课。",
    "actionAdvice": "今天先围绕“变化”做一个低风险小行动，并在晚些时候回看感受。"
  },
  {
    "id": "justice",
    "name": "正义",
    "suit": "major",
    "arcana": "major",
    "image": "/packages/tarot-assets/assets/tarot/11-justice.jpg",
    "keywords": [
      "公平",
      "事实",
      "责任"
    ],
    "upright": "这张牌指向事实、边界、责任和清晰判断。它提醒你先看见这个阶段的核心主题，再决定下一步。",
    "reversed": "逆位时，它更像是在提示回避责任、偏见、只凭情绪下结论。先修正节奏，不急着给事情下结论。",
    "loveReading": "在感情里，正义更强调事实、边界、责任和清晰判断。你可以先看见关系中的真实需求，而不是只追问一个确定答案。",
    "workReading": "在工作和现实选择里，正义提示事实、边界、责任和清晰判断。适合把想法变成可执行的下一步。",
    "healingReading": "在疗愈层面，正义邀请你回到自己身上，承认公平正在成为此刻的功课。",
    "actionAdvice": "今天先围绕“公平”做一个低风险小行动，并在晚些时候回看感受。"
  },
  {
    "id": "hanged-man",
    "name": "倒吊人",
    "suit": "major",
    "arcana": "major",
    "image": "/packages/tarot-assets/assets/tarot/12-the-hanged-man.jpg",
    "keywords": [
      "暂停",
      "换角度",
      "臣服"
    ],
    "upright": "这张牌指向暂停、换角度、用新的视野理解问题。它提醒你先看见这个阶段的核心主题，再决定下一步。",
    "reversed": "逆位时，它更像是在提示卡住、被动等待、牺牲感过重。先修正节奏，不急着给事情下结论。",
    "loveReading": "在感情里，倒吊人更强调暂停、换角度、用新的视野理解问题。你可以先看见关系中的真实需求，而不是只追问一个确定答案。",
    "workReading": "在工作和现实选择里，倒吊人提示暂停、换角度、用新的视野理解问题。适合把想法变成可执行的下一步。",
    "healingReading": "在疗愈层面，倒吊人邀请你回到自己身上，承认暂停正在成为此刻的功课。",
    "actionAdvice": "今天先围绕“暂停”做一个低风险小行动，并在晚些时候回看感受。"
  },
  {
    "id": "death",
    "name": "死神",
    "suit": "major",
    "arcana": "major",
    "image": "/packages/tarot-assets/assets/tarot/13-death.jpg",
    "keywords": [
      "结束",
      "转化",
      "更新"
    ],
    "upright": "这张牌指向结束旧阶段、转化、为新生腾出空间。它提醒你先看见这个阶段的核心主题，再决定下一步。",
    "reversed": "逆位时，它更像是在提示不愿放手、拖延告别、害怕改变。先修正节奏，不急着给事情下结论。",
    "loveReading": "在感情里，死神更强调结束旧阶段、转化、为新生腾出空间。你可以先看见关系中的真实需求，而不是只追问一个确定答案。",
    "workReading": "在工作和现实选择里，死神提示结束旧阶段、转化、为新生腾出空间。适合把想法变成可执行的下一步。",
    "healingReading": "在疗愈层面，死神邀请你回到自己身上，承认结束正在成为此刻的功课。",
    "actionAdvice": "今天先围绕“结束”做一个低风险小行动，并在晚些时候回看感受。"
  },
  {
    "id": "temperance",
    "name": "节制",
    "suit": "major",
    "arcana": "major",
    "image": "/packages/tarot-assets/assets/tarot/14-temperance.jpg",
    "keywords": [
      "调和",
      "等待",
      "稳定"
    ],
    "upright": "这张牌指向调和、耐心、慢慢恢复平衡。它提醒你先看见这个阶段的核心主题，再决定下一步。",
    "reversed": "逆位时，它更像是在提示节奏失衡、急着修复、情绪和行动不一致。先修正节奏，不急着给事情下结论。",
    "loveReading": "在感情里，节制更强调调和、耐心、慢慢恢复平衡。你可以先看见关系中的真实需求，而不是只追问一个确定答案。",
    "workReading": "在工作和现实选择里，节制提示调和、耐心、慢慢恢复平衡。适合把想法变成可执行的下一步。",
    "healingReading": "在疗愈层面，节制邀请你回到自己身上，承认调和正在成为此刻的功课。",
    "actionAdvice": "今天先围绕“调和”做一个低风险小行动，并在晚些时候回看感受。"
  },
  {
    "id": "devil",
    "name": "恶魔",
    "suit": "major",
    "arcana": "major",
    "image": "/packages/tarot-assets/assets/tarot/15-the-devil.jpg",
    "keywords": [
      "执念",
      "诱惑",
      "束缚"
    ],
    "upright": "这张牌指向看见执念、依赖、欲望和关系中的束缚。它提醒你先看见这个阶段的核心主题，再决定下一步。",
    "reversed": "逆位时，它更像是在提示被惯性牵着走、明知消耗仍难离开。先修正节奏，不急着给事情下结论。",
    "loveReading": "在感情里，恶魔更强调看见执念、依赖、欲望和关系中的束缚。你可以先看见关系中的真实需求，而不是只追问一个确定答案。",
    "workReading": "在工作和现实选择里，恶魔提示看见执念、依赖、欲望和关系中的束缚。适合把想法变成可执行的下一步。",
    "healingReading": "在疗愈层面，恶魔邀请你回到自己身上，承认执念正在成为此刻的功课。",
    "actionAdvice": "今天先围绕“执念”做一个低风险小行动，并在晚些时候回看感受。"
  },
  {
    "id": "tower",
    "name": "高塔",
    "suit": "major",
    "arcana": "major",
    "image": "/packages/tarot-assets/assets/tarot/16-the-tower.jpg",
    "keywords": [
      "崩塌",
      "真相",
      "重建"
    ],
    "upright": "这张牌指向旧结构被打破、真相显现、需要重建。它提醒你先看见这个阶段的核心主题，再决定下一步。",
    "reversed": "逆位时，它更像是在提示抗拒面对现实、害怕变化、仍想维持表面稳定。先修正节奏，不急着给事情下结论。",
    "loveReading": "在感情里，高塔更强调旧结构被打破、真相显现、需要重建。你可以先看见关系中的真实需求，而不是只追问一个确定答案。",
    "workReading": "在工作和现实选择里，高塔提示旧结构被打破、真相显现、需要重建。适合把想法变成可执行的下一步。",
    "healingReading": "在疗愈层面，高塔邀请你回到自己身上，承认崩塌正在成为此刻的功课。",
    "actionAdvice": "今天先围绕“崩塌”做一个低风险小行动，并在晚些时候回看感受。"
  },
  {
    "id": "star",
    "name": "星星",
    "suit": "major",
    "arcana": "major",
    "image": "/packages/tarot-assets/assets/tarot/17-the-star.jpg",
    "keywords": [
      "修复",
      "希望",
      "慢慢来"
    ],
    "upright": "这张牌指向疗愈、希望、重新相信自己。它提醒你先看见这个阶段的核心主题，再决定下一步。",
    "reversed": "逆位时，它更像是在提示暂时看不见希望、需要降低期待先照顾当下。先修正节奏，不急着给事情下结论。",
    "loveReading": "在感情里，星星更强调疗愈、希望、重新相信自己。你可以先看见关系中的真实需求，而不是只追问一个确定答案。",
    "workReading": "在工作和现实选择里，星星提示疗愈、希望、重新相信自己。适合把想法变成可执行的下一步。",
    "healingReading": "在疗愈层面，星星邀请你回到自己身上，承认修复正在成为此刻的功课。",
    "actionAdvice": "今天先围绕“修复”做一个低风险小行动，并在晚些时候回看感受。"
  },
  {
    "id": "moon",
    "name": "月亮",
    "suit": "major",
    "arcana": "major",
    "image": "/packages/tarot-assets/assets/tarot/18-the-moon.jpg",
    "keywords": [
      "不确定",
      "想象",
      "直觉"
    ],
    "upright": "这张牌指向潜意识、不确定、梦境和直觉信号。它提醒你先看见这个阶段的核心主题，再决定下一步。",
    "reversed": "逆位时，它更像是在提示误会浮现、事实与想象混在一起。先修正节奏，不急着给事情下结论。",
    "loveReading": "在感情里，月亮更强调潜意识、不确定、梦境和直觉信号。你可以先看见关系中的真实需求，而不是只追问一个确定答案。",
    "workReading": "在工作和现实选择里，月亮提示潜意识、不确定、梦境和直觉信号。适合把想法变成可执行的下一步。",
    "healingReading": "在疗愈层面，月亮邀请你回到自己身上，承认不确定正在成为此刻的功课。",
    "actionAdvice": "今天先围绕“不确定”做一个低风险小行动，并在晚些时候回看感受。"
  },
  {
    "id": "sun",
    "name": "太阳",
    "suit": "major",
    "arcana": "major",
    "image": "/packages/tarot-assets/assets/tarot/19-the-sun.jpg",
    "keywords": [
      "清晰",
      "能量",
      "坦诚"
    ],
    "upright": "这张牌指向清晰、坦诚、恢复活力和可见度。它提醒你先看见这个阶段的核心主题，再决定下一步。",
    "reversed": "逆位时，它更像是在提示不必强迫乐观、先从小恢复开始。先修正节奏，不急着给事情下结论。",
    "loveReading": "在感情里，太阳更强调清晰、坦诚、恢复活力和可见度。你可以先看见关系中的真实需求，而不是只追问一个确定答案。",
    "workReading": "在工作和现实选择里，太阳提示清晰、坦诚、恢复活力和可见度。适合把想法变成可执行的下一步。",
    "healingReading": "在疗愈层面，太阳邀请你回到自己身上，承认清晰正在成为此刻的功课。",
    "actionAdvice": "今天先围绕“清晰”做一个低风险小行动，并在晚些时候回看感受。"
  },
  {
    "id": "judgement",
    "name": "审判",
    "suit": "major",
    "arcana": "major",
    "image": "/packages/tarot-assets/assets/tarot/20-judgement.jpg",
    "keywords": [
      "觉醒",
      "召唤",
      "复盘"
    ],
    "upright": "这张牌指向觉醒、复盘、听见更大的召唤。它提醒你先看见这个阶段的核心主题，再决定下一步。",
    "reversed": "逆位时，它更像是在提示逃避回看、害怕面对选择后的责任。先修正节奏，不急着给事情下结论。",
    "loveReading": "在感情里，审判更强调觉醒、复盘、听见更大的召唤。你可以先看见关系中的真实需求，而不是只追问一个确定答案。",
    "workReading": "在工作和现实选择里，审判提示觉醒、复盘、听见更大的召唤。适合把想法变成可执行的下一步。",
    "healingReading": "在疗愈层面，审判邀请你回到自己身上，承认觉醒正在成为此刻的功课。",
    "actionAdvice": "今天先围绕“觉醒”做一个低风险小行动，并在晚些时候回看感受。"
  },
  {
    "id": "world",
    "name": "世界",
    "suit": "major",
    "arcana": "major",
    "image": "/packages/tarot-assets/assets/tarot/21-the-world.jpg",
    "keywords": [
      "阶段完成",
      "整合",
      "回看"
    ],
    "upright": "这张牌指向完成、整合、阶段收尾后的成熟。它提醒你先看见这个阶段的核心主题，再决定下一步。",
    "reversed": "逆位时，它更像是在提示还没真正收尾、需要处理遗留情绪。先修正节奏，不急着给事情下结论。",
    "loveReading": "在感情里，世界更强调完成、整合、阶段收尾后的成熟。你可以先看见关系中的真实需求，而不是只追问一个确定答案。",
    "workReading": "在工作和现实选择里，世界提示完成、整合、阶段收尾后的成熟。适合把想法变成可执行的下一步。",
    "healingReading": "在疗愈层面，世界邀请你回到自己身上，承认阶段完成正在成为此刻的功课。",
    "actionAdvice": "今天先围绕“阶段完成”做一个低风险小行动，并在晚些时候回看感受。"
  },
  {
    "id": "cups-01-ace",
    "name": "圣杯王牌",
    "suit": "cups",
    "arcana": "minor",
    "image": "/packages/tarot-assets/assets/tarot/cups-01-ace.jpg",
    "keywords": [
      "柔软",
      "开始",
      "种子"
    ],
    "upright": "圣杯王牌把“情绪、关系、依恋和内在需求”带到王牌的阶段：新的能量入口正在出现，适合先保护这个种子。",
    "reversed": "逆位时，圣杯王牌提示：机会还在萌芽，暂时不宜急着证明结果。",
    "loveReading": "在感情里，圣杯王牌关注关系里的感受与回应。它提醒你先看见互动里的真实感受，再决定靠近或暂停。",
    "workReading": "在工作里，圣杯王牌关注团队氛围、热情和情绪投入。它适合用来判断当前资源、节奏和下一步行动。",
    "healingReading": "在疗愈层面，圣杯王牌提醒你允许情绪被看见，再决定如何回应。",
    "actionAdvice": "今天围绕“柔软”完成一个 24 小时内可执行的小动作。"
  },
  {
    "id": "cups-02-two",
    "name": "圣杯二",
    "suit": "cups",
    "arcana": "minor",
    "image": "/packages/tarot-assets/assets/tarot/cups-02-two.jpg",
    "keywords": [
      "连接",
      "互相",
      "靠近"
    ],
    "upright": "关系里有互相看见的可能，重点是让感受自然流动。",
    "reversed": "关系回应可能不对等，先不要用单方面投入证明连接。",
    "loveReading": "在感情里，圣杯二关注关系里的感受与回应。它提醒你先看见互动里的真实感受，再决定靠近或暂停。",
    "workReading": "在工作里，圣杯二关注团队氛围、热情和情绪投入。它适合用来判断当前资源、节奏和下一步行动。",
    "healingReading": "在疗愈层面，圣杯二提醒你允许情绪被看见，再决定如何回应。",
    "actionAdvice": "今天围绕“连接”完成一个 24 小时内可执行的小动作。"
  },
  {
    "id": "cups-03-three",
    "name": "圣杯三",
    "suit": "cups",
    "arcana": "minor",
    "image": "/packages/tarot-assets/assets/tarot/cups-03-three.jpg",
    "keywords": [
      "庆祝",
      "朋友",
      "支持"
    ],
    "upright": "外部支持和轻松交流能帮助你看见更宽的关系视角。",
    "reversed": "别让旁人的声音盖过你的真实感受。",
    "loveReading": "在感情里，圣杯三关注关系里的感受与回应。它提醒你先看见互动里的真实感受，再决定靠近或暂停。",
    "workReading": "在工作里，圣杯三关注团队氛围、热情和情绪投入。它适合用来判断当前资源、节奏和下一步行动。",
    "healingReading": "在疗愈层面，圣杯三提醒你允许情绪被看见，再决定如何回应。",
    "actionAdvice": "今天围绕“庆祝”完成一个 24 小时内可执行的小动作。"
  },
  {
    "id": "cups-04-four",
    "name": "圣杯四",
    "suit": "cups",
    "arcana": "minor",
    "image": "/packages/tarot-assets/assets/tarot/cups-04-four.jpg",
    "keywords": [
      "柔软",
      "稳定",
      "停顿"
    ],
    "upright": "圣杯四把“情绪、关系、依恋和内在需求”带到四的阶段：稳定结构正在形成，但也可能带来停顿。",
    "reversed": "逆位时，圣杯四提示：安全感不足或结构太紧，需要给自己一点流动空间。",
    "loveReading": "在感情里，圣杯四关注关系里的感受与回应。它提醒你先看见互动里的真实感受，再决定靠近或暂停。",
    "workReading": "在工作里，圣杯四关注团队氛围、热情和情绪投入。它适合用来判断当前资源、节奏和下一步行动。",
    "healingReading": "在疗愈层面，圣杯四提醒你允许情绪被看见，再决定如何回应。",
    "actionAdvice": "今天围绕“柔软”完成一个 24 小时内可执行的小动作。"
  },
  {
    "id": "cups-05-five",
    "name": "圣杯五",
    "suit": "cups",
    "arcana": "minor",
    "image": "/packages/tarot-assets/assets/tarot/cups-05-five.jpg",
    "keywords": [
      "失落",
      "遗憾",
      "回看"
    ],
    "upright": "失落是真实的，但并不代表所有可能都已经结束。",
    "reversed": "你正在从遗憾里慢慢回头，看见仍可珍惜的部分。",
    "loveReading": "在感情里，圣杯五关注关系里的感受与回应。它提醒你先看见互动里的真实感受，再决定靠近或暂停。",
    "workReading": "在工作里，圣杯五关注团队氛围、热情和情绪投入。它适合用来判断当前资源、节奏和下一步行动。",
    "healingReading": "在疗愈层面，圣杯五提醒你允许情绪被看见，再决定如何回应。",
    "actionAdvice": "今天围绕“失落”完成一个 24 小时内可执行的小动作。"
  },
  {
    "id": "cups-06-six",
    "name": "圣杯六",
    "suit": "cups",
    "arcana": "minor",
    "image": "/packages/tarot-assets/assets/tarot/cups-06-six.jpg",
    "keywords": [
      "柔软",
      "修复",
      "回流"
    ],
    "upright": "圣杯六把“情绪、关系、依恋和内在需求”带到六的阶段：能量开始回流，适合接受支持或做一次温和修复。",
    "reversed": "逆位时，圣杯六提示：旧经验影响现在，别让回忆替你决定当下。",
    "loveReading": "在感情里，圣杯六关注关系里的感受与回应。它提醒你先看见互动里的真实感受，再决定靠近或暂停。",
    "workReading": "在工作里，圣杯六关注团队氛围、热情和情绪投入。它适合用来判断当前资源、节奏和下一步行动。",
    "healingReading": "在疗愈层面，圣杯六提醒你允许情绪被看见，再决定如何回应。",
    "actionAdvice": "今天围绕“柔软”完成一个 24 小时内可执行的小动作。"
  },
  {
    "id": "cups-07-seven",
    "name": "圣杯七",
    "suit": "cups",
    "arcana": "minor",
    "image": "/packages/tarot-assets/assets/tarot/cups-07-seven.jpg",
    "keywords": [
      "柔软",
      "评估",
      "防御"
    ],
    "upright": "圣杯七把“情绪、关系、依恋和内在需求”带到七的阶段：需要评估投入与回报，也要看见自己的防御。",
    "reversed": "逆位时，圣杯七提示：过度防备或等待太久，容易让行动停住。",
    "loveReading": "在感情里，圣杯七关注关系里的感受与回应。它提醒你先看见互动里的真实感受，再决定靠近或暂停。",
    "workReading": "在工作里，圣杯七关注团队氛围、热情和情绪投入。它适合用来判断当前资源、节奏和下一步行动。",
    "healingReading": "在疗愈层面，圣杯七提醒你允许情绪被看见，再决定如何回应。",
    "actionAdvice": "今天围绕“柔软”完成一个 24 小时内可执行的小动作。"
  },
  {
    "id": "cups-08-eight",
    "name": "圣杯八",
    "suit": "cups",
    "arcana": "minor",
    "image": "/packages/tarot-assets/assets/tarot/cups-08-eight.jpg",
    "keywords": [
      "离开",
      "寻找",
      "转身"
    ],
    "upright": "你可能需要离开旧情绪，去寻找更适合自己的答案。",
    "reversed": "你还在犹豫是否转身，先承认自己真正舍不得什么。",
    "loveReading": "在感情里，圣杯八关注关系里的感受与回应。它提醒你先看见互动里的真实感受，再决定靠近或暂停。",
    "workReading": "在工作里，圣杯八关注团队氛围、热情和情绪投入。它适合用来判断当前资源、节奏和下一步行动。",
    "healingReading": "在疗愈层面，圣杯八提醒你允许情绪被看见，再决定如何回应。",
    "actionAdvice": "今天围绕“离开”完成一个 24 小时内可执行的小动作。"
  },
  {
    "id": "cups-09-nine",
    "name": "圣杯九",
    "suit": "cups",
    "arcana": "minor",
    "image": "/packages/tarot-assets/assets/tarot/cups-09-nine.jpg",
    "keywords": [
      "柔软",
      "成熟",
      "临界点"
    ],
    "upright": "圣杯九把“情绪、关系、依恋和内在需求”带到九的阶段：你接近一个阶段性答案，需要更成熟地照顾自己。",
    "reversed": "逆位时，圣杯九提示：临近结果时反而容易紧绷，别把压力放大成全部事实。",
    "loveReading": "在感情里，圣杯九关注关系里的感受与回应。它提醒你先看见互动里的真实感受，再决定靠近或暂停。",
    "workReading": "在工作里，圣杯九关注团队氛围、热情和情绪投入。它适合用来判断当前资源、节奏和下一步行动。",
    "healingReading": "在疗愈层面，圣杯九提醒你允许情绪被看见，再决定如何回应。",
    "actionAdvice": "今天围绕“柔软”完成一个 24 小时内可执行的小动作。"
  },
  {
    "id": "cups-10-ten",
    "name": "圣杯十",
    "suit": "cups",
    "arcana": "minor",
    "image": "/packages/tarot-assets/assets/tarot/cups-10-ten.jpg",
    "keywords": [
      "圆满",
      "亲密",
      "归属"
    ],
    "upright": "你向往更稳定的情感归属，也可以看见关系里的温暖资源。",
    "reversed": "理想画面和现实相处有落差，需要降低完美期待。",
    "loveReading": "在感情里，圣杯十关注关系里的感受与回应。它提醒你先看见互动里的真实感受，再决定靠近或暂停。",
    "workReading": "在工作里，圣杯十关注团队氛围、热情和情绪投入。它适合用来判断当前资源、节奏和下一步行动。",
    "healingReading": "在疗愈层面，圣杯十提醒你允许情绪被看见，再决定如何回应。",
    "actionAdvice": "今天围绕“圆满”完成一个 24 小时内可执行的小动作。"
  },
  {
    "id": "cups-11-page",
    "name": "圣杯侍从",
    "suit": "cups",
    "arcana": "minor",
    "image": "/packages/tarot-assets/assets/tarot/cups-11-page.jpg",
    "keywords": [
      "柔软",
      "学习",
      "好奇"
    ],
    "upright": "圣杯侍从把“情绪、关系、依恋和内在需求”带到侍从的阶段：像初学者一样接收讯息，适合提问和观察。",
    "reversed": "逆位时，圣杯侍从提示：信息不成熟，别急着把一个信号当成最终答案。",
    "loveReading": "在感情里，圣杯侍从关注关系里的感受与回应。它提醒你先看见互动里的真实感受，再决定靠近或暂停。",
    "workReading": "在工作里，圣杯侍从关注团队氛围、热情和情绪投入。它适合用来判断当前资源、节奏和下一步行动。",
    "healingReading": "在疗愈层面，圣杯侍从提醒你允许情绪被看见，再决定如何回应。",
    "actionAdvice": "今天围绕“柔软”完成一个 24 小时内可执行的小动作。"
  },
  {
    "id": "cups-12-knight",
    "name": "圣杯骑士",
    "suit": "cups",
    "arcana": "minor",
    "image": "/packages/tarot-assets/assets/tarot/cups-12-knight.jpg",
    "keywords": [
      "柔软",
      "推进",
      "追求"
    ],
    "upright": "圣杯骑士把“情绪、关系、依恋和内在需求”带到骑士的阶段：行动正在加速，关键是选择合适节奏。",
    "reversed": "逆位时，圣杯骑士提示：过快或过慢都会失衡，先确认动机。",
    "loveReading": "在感情里，圣杯骑士关注关系里的感受与回应。它提醒你先看见互动里的真实感受，再决定靠近或暂停。",
    "workReading": "在工作里，圣杯骑士关注团队氛围、热情和情绪投入。它适合用来判断当前资源、节奏和下一步行动。",
    "healingReading": "在疗愈层面，圣杯骑士提醒你允许情绪被看见，再决定如何回应。",
    "actionAdvice": "今天围绕“柔软”完成一个 24 小时内可执行的小动作。"
  },
  {
    "id": "cups-13-queen",
    "name": "圣杯王后",
    "suit": "cups",
    "arcana": "minor",
    "image": "/packages/tarot-assets/assets/tarot/cups-13-queen.jpg",
    "keywords": [
      "柔软",
      "承接",
      "滋养"
    ],
    "upright": "圣杯王后把“情绪、关系、依恋和内在需求”带到王后的阶段：成熟地承接感受、资源或关系，是这张牌的重点。",
    "reversed": "逆位时，圣杯王后提示：过度承接容易变成消耗，需要把能量留给自己。",
    "loveReading": "在感情里，圣杯王后关注关系里的感受与回应。它提醒你先看见互动里的真实感受，再决定靠近或暂停。",
    "workReading": "在工作里，圣杯王后关注团队氛围、热情和情绪投入。它适合用来判断当前资源、节奏和下一步行动。",
    "healingReading": "在疗愈层面，圣杯王后提醒你允许情绪被看见，再决定如何回应。",
    "actionAdvice": "今天围绕“柔软”完成一个 24 小时内可执行的小动作。"
  },
  {
    "id": "cups-14-king",
    "name": "圣杯国王",
    "suit": "cups",
    "arcana": "minor",
    "image": "/packages/tarot-assets/assets/tarot/cups-14-king.jpg",
    "keywords": [
      "柔软",
      "掌控",
      "成熟"
    ],
    "upright": "圣杯国王把“情绪、关系、依恋和内在需求”带到国王的阶段：需要成熟决策和稳定掌控，不再只凭情绪反应。",
    "reversed": "逆位时，圣杯国王提示：控制过强会压住真实感受，先让判断更柔软一点。",
    "loveReading": "在感情里，圣杯国王关注关系里的感受与回应。它提醒你先看见互动里的真实感受，再决定靠近或暂停。",
    "workReading": "在工作里，圣杯国王关注团队氛围、热情和情绪投入。它适合用来判断当前资源、节奏和下一步行动。",
    "healingReading": "在疗愈层面，圣杯国王提醒你允许情绪被看见，再决定如何回应。",
    "actionAdvice": "今天围绕“柔软”完成一个 24 小时内可执行的小动作。"
  },
  {
    "id": "wands-01-ace",
    "name": "权杖王牌",
    "suit": "wands",
    "arcana": "minor",
    "image": "/packages/tarot-assets/assets/tarot/wands-01-ace.jpg",
    "keywords": [
      "行动",
      "开始",
      "种子"
    ],
    "upright": "权杖王牌把“行动、热情、创造力和推进节奏”带到王牌的阶段：新的能量入口正在出现，适合先保护这个种子。",
    "reversed": "逆位时，权杖王牌提示：机会还在萌芽，暂时不宜急着证明结果。",
    "loveReading": "在感情里，权杖王牌关注主动靠近、热情和关系推进。它提醒你先看见互动里的真实感受，再决定靠近或暂停。",
    "workReading": "在工作里，权杖王牌关注目标、执行力和项目推进。它适合用来判断当前资源、节奏和下一步行动。",
    "healingReading": "在疗愈层面，权杖王牌提醒你把能量落到一个小行动里。",
    "actionAdvice": "今天围绕“行动”完成一个 24 小时内可执行的小动作。"
  },
  {
    "id": "wands-02-two",
    "name": "权杖二",
    "suit": "wands",
    "arcana": "minor",
    "image": "/packages/tarot-assets/assets/tarot/wands-02-two.jpg",
    "keywords": [
      "计划",
      "选择",
      "远方"
    ],
    "upright": "你在规划下一步，适合把愿景拆成具体行动。",
    "reversed": "计划太多会分散能量，先选一个最小方向。",
    "loveReading": "在感情里，权杖二关注主动靠近、热情和关系推进。它提醒你先看见互动里的真实感受，再决定靠近或暂停。",
    "workReading": "在工作里，权杖二关注目标、执行力和项目推进。它适合用来判断当前资源、节奏和下一步行动。",
    "healingReading": "在疗愈层面，权杖二提醒你把能量落到一个小行动里。",
    "actionAdvice": "今天围绕“计划”完成一个 24 小时内可执行的小动作。"
  },
  {
    "id": "wands-03-three",
    "name": "权杖三",
    "suit": "wands",
    "arcana": "minor",
    "image": "/packages/tarot-assets/assets/tarot/wands-03-three.jpg",
    "keywords": [
      "行动",
      "扩展",
      "表达"
    ],
    "upright": "权杖三把“行动、热情、创造力和推进节奏”带到三的阶段：事情开始向外扩展，需要表达、协作或整理成果。",
    "reversed": "逆位时，权杖三提示：表达受阻或期待落空，需要重新校准配合方式。",
    "loveReading": "在感情里，权杖三关注主动靠近、热情和关系推进。它提醒你先看见互动里的真实感受，再决定靠近或暂停。",
    "workReading": "在工作里，权杖三关注目标、执行力和项目推进。它适合用来判断当前资源、节奏和下一步行动。",
    "healingReading": "在疗愈层面，权杖三提醒你把能量落到一个小行动里。",
    "actionAdvice": "今天围绕“行动”完成一个 24 小时内可执行的小动作。"
  },
  {
    "id": "wands-04-four",
    "name": "权杖四",
    "suit": "wands",
    "arcana": "minor",
    "image": "/packages/tarot-assets/assets/tarot/wands-04-four.jpg",
    "keywords": [
      "行动",
      "稳定",
      "停顿"
    ],
    "upright": "权杖四把“行动、热情、创造力和推进节奏”带到四的阶段：稳定结构正在形成，但也可能带来停顿。",
    "reversed": "逆位时，权杖四提示：安全感不足或结构太紧，需要给自己一点流动空间。",
    "loveReading": "在感情里，权杖四关注主动靠近、热情和关系推进。它提醒你先看见互动里的真实感受，再决定靠近或暂停。",
    "workReading": "在工作里，权杖四关注目标、执行力和项目推进。它适合用来判断当前资源、节奏和下一步行动。",
    "healingReading": "在疗愈层面，权杖四提醒你把能量落到一个小行动里。",
    "actionAdvice": "今天围绕“行动”完成一个 24 小时内可执行的小动作。"
  },
  {
    "id": "wands-05-five",
    "name": "权杖五",
    "suit": "wands",
    "arcana": "minor",
    "image": "/packages/tarot-assets/assets/tarot/wands-05-five.jpg",
    "keywords": [
      "行动",
      "冲突",
      "失衡"
    ],
    "upright": "权杖五把“行动、热情、创造力和推进节奏”带到五的阶段：冲突或失衡浮现，它不是结论，而是需要被处理的信号。",
    "reversed": "逆位时，权杖五提示：你可能困在消耗里，先减少无效对抗。",
    "loveReading": "在感情里，权杖五关注主动靠近、热情和关系推进。它提醒你先看见互动里的真实感受，再决定靠近或暂停。",
    "workReading": "在工作里，权杖五关注目标、执行力和项目推进。它适合用来判断当前资源、节奏和下一步行动。",
    "healingReading": "在疗愈层面，权杖五提醒你把能量落到一个小行动里。",
    "actionAdvice": "今天围绕“行动”完成一个 24 小时内可执行的小动作。"
  },
  {
    "id": "wands-06-six",
    "name": "权杖六",
    "suit": "wands",
    "arcana": "minor",
    "image": "/packages/tarot-assets/assets/tarot/wands-06-six.jpg",
    "keywords": [
      "行动",
      "修复",
      "回流"
    ],
    "upright": "权杖六把“行动、热情、创造力和推进节奏”带到六的阶段：能量开始回流，适合接受支持或做一次温和修复。",
    "reversed": "逆位时，权杖六提示：旧经验影响现在，别让回忆替你决定当下。",
    "loveReading": "在感情里，权杖六关注主动靠近、热情和关系推进。它提醒你先看见互动里的真实感受，再决定靠近或暂停。",
    "workReading": "在工作里，权杖六关注目标、执行力和项目推进。它适合用来判断当前资源、节奏和下一步行动。",
    "healingReading": "在疗愈层面，权杖六提醒你把能量落到一个小行动里。",
    "actionAdvice": "今天围绕“行动”完成一个 24 小时内可执行的小动作。"
  },
  {
    "id": "wands-07-seven",
    "name": "权杖七",
    "suit": "wands",
    "arcana": "minor",
    "image": "/packages/tarot-assets/assets/tarot/wands-07-seven.jpg",
    "keywords": [
      "行动",
      "评估",
      "防御"
    ],
    "upright": "权杖七把“行动、热情、创造力和推进节奏”带到七的阶段：需要评估投入与回报，也要看见自己的防御。",
    "reversed": "逆位时，权杖七提示：过度防备或等待太久，容易让行动停住。",
    "loveReading": "在感情里，权杖七关注主动靠近、热情和关系推进。它提醒你先看见互动里的真实感受，再决定靠近或暂停。",
    "workReading": "在工作里，权杖七关注目标、执行力和项目推进。它适合用来判断当前资源、节奏和下一步行动。",
    "healingReading": "在疗愈层面，权杖七提醒你把能量落到一个小行动里。",
    "actionAdvice": "今天围绕“行动”完成一个 24 小时内可执行的小动作。"
  },
  {
    "id": "wands-08-eight",
    "name": "权杖八",
    "suit": "wands",
    "arcana": "minor",
    "image": "/packages/tarot-assets/assets/tarot/wands-08-eight.jpg",
    "keywords": [
      "快速",
      "消息",
      "推进"
    ],
    "upright": "事情可能加速，适合把握窗口，但不要忽略细节。",
    "reversed": "消息或推进受阻，先别急着催促答案。",
    "loveReading": "在感情里，权杖八关注主动靠近、热情和关系推进。它提醒你先看见互动里的真实感受，再决定靠近或暂停。",
    "workReading": "在工作里，权杖八关注目标、执行力和项目推进。它适合用来判断当前资源、节奏和下一步行动。",
    "healingReading": "在疗愈层面，权杖八提醒你把能量落到一个小行动里。",
    "actionAdvice": "今天围绕“快速”完成一个 24 小时内可执行的小动作。"
  },
  {
    "id": "wands-09-nine",
    "name": "权杖九",
    "suit": "wands",
    "arcana": "minor",
    "image": "/packages/tarot-assets/assets/tarot/wands-09-nine.jpg",
    "keywords": [
      "行动",
      "成熟",
      "临界点"
    ],
    "upright": "权杖九把“行动、热情、创造力和推进节奏”带到九的阶段：你接近一个阶段性答案，需要更成熟地照顾自己。",
    "reversed": "逆位时，权杖九提示：临近结果时反而容易紧绷，别把压力放大成全部事实。",
    "loveReading": "在感情里，权杖九关注主动靠近、热情和关系推进。它提醒你先看见互动里的真实感受，再决定靠近或暂停。",
    "workReading": "在工作里，权杖九关注目标、执行力和项目推进。它适合用来判断当前资源、节奏和下一步行动。",
    "healingReading": "在疗愈层面，权杖九提醒你把能量落到一个小行动里。",
    "actionAdvice": "今天围绕“行动”完成一个 24 小时内可执行的小动作。"
  },
  {
    "id": "wands-10-ten",
    "name": "权杖十",
    "suit": "wands",
    "arcana": "minor",
    "image": "/packages/tarot-assets/assets/tarot/wands-10-ten.jpg",
    "keywords": [
      "行动",
      "完成",
      "累积"
    ],
    "upright": "权杖十把“行动、热情、创造力和推进节奏”带到十的阶段：一个循环接近完成，结果来自长期累积。",
    "reversed": "逆位时，权杖十提示：旧循环负担过重，需要结束或重新分配责任。",
    "loveReading": "在感情里，权杖十关注主动靠近、热情和关系推进。它提醒你先看见互动里的真实感受，再决定靠近或暂停。",
    "workReading": "在工作里，权杖十关注目标、执行力和项目推进。它适合用来判断当前资源、节奏和下一步行动。",
    "healingReading": "在疗愈层面，权杖十提醒你把能量落到一个小行动里。",
    "actionAdvice": "今天围绕“行动”完成一个 24 小时内可执行的小动作。"
  },
  {
    "id": "wands-11-page",
    "name": "权杖侍从",
    "suit": "wands",
    "arcana": "minor",
    "image": "/packages/tarot-assets/assets/tarot/wands-11-page.jpg",
    "keywords": [
      "行动",
      "学习",
      "好奇"
    ],
    "upright": "权杖侍从把“行动、热情、创造力和推进节奏”带到侍从的阶段：像初学者一样接收讯息，适合提问和观察。",
    "reversed": "逆位时，权杖侍从提示：信息不成熟，别急着把一个信号当成最终答案。",
    "loveReading": "在感情里，权杖侍从关注主动靠近、热情和关系推进。它提醒你先看见互动里的真实感受，再决定靠近或暂停。",
    "workReading": "在工作里，权杖侍从关注目标、执行力和项目推进。它适合用来判断当前资源、节奏和下一步行动。",
    "healingReading": "在疗愈层面，权杖侍从提醒你把能量落到一个小行动里。",
    "actionAdvice": "今天围绕“行动”完成一个 24 小时内可执行的小动作。"
  },
  {
    "id": "wands-12-knight",
    "name": "权杖骑士",
    "suit": "wands",
    "arcana": "minor",
    "image": "/packages/tarot-assets/assets/tarot/wands-12-knight.jpg",
    "keywords": [
      "行动",
      "推进",
      "追求"
    ],
    "upright": "权杖骑士把“行动、热情、创造力和推进节奏”带到骑士的阶段：行动正在加速，关键是选择合适节奏。",
    "reversed": "逆位时，权杖骑士提示：过快或过慢都会失衡，先确认动机。",
    "loveReading": "在感情里，权杖骑士关注主动靠近、热情和关系推进。它提醒你先看见互动里的真实感受，再决定靠近或暂停。",
    "workReading": "在工作里，权杖骑士关注目标、执行力和项目推进。它适合用来判断当前资源、节奏和下一步行动。",
    "healingReading": "在疗愈层面，权杖骑士提醒你把能量落到一个小行动里。",
    "actionAdvice": "今天围绕“行动”完成一个 24 小时内可执行的小动作。"
  },
  {
    "id": "wands-13-queen",
    "name": "权杖王后",
    "suit": "wands",
    "arcana": "minor",
    "image": "/packages/tarot-assets/assets/tarot/wands-13-queen.jpg",
    "keywords": [
      "行动",
      "承接",
      "滋养"
    ],
    "upright": "权杖王后把“行动、热情、创造力和推进节奏”带到王后的阶段：成熟地承接感受、资源或关系，是这张牌的重点。",
    "reversed": "逆位时，权杖王后提示：过度承接容易变成消耗，需要把能量留给自己。",
    "loveReading": "在感情里，权杖王后关注主动靠近、热情和关系推进。它提醒你先看见互动里的真实感受，再决定靠近或暂停。",
    "workReading": "在工作里，权杖王后关注目标、执行力和项目推进。它适合用来判断当前资源、节奏和下一步行动。",
    "healingReading": "在疗愈层面，权杖王后提醒你把能量落到一个小行动里。",
    "actionAdvice": "今天围绕“行动”完成一个 24 小时内可执行的小动作。"
  },
  {
    "id": "wands-14-king",
    "name": "权杖国王",
    "suit": "wands",
    "arcana": "minor",
    "image": "/packages/tarot-assets/assets/tarot/wands-14-king.jpg",
    "keywords": [
      "行动",
      "掌控",
      "成熟"
    ],
    "upright": "权杖国王把“行动、热情、创造力和推进节奏”带到国王的阶段：需要成熟决策和稳定掌控，不再只凭情绪反应。",
    "reversed": "逆位时，权杖国王提示：控制过强会压住真实感受，先让判断更柔软一点。",
    "loveReading": "在感情里，权杖国王关注主动靠近、热情和关系推进。它提醒你先看见互动里的真实感受，再决定靠近或暂停。",
    "workReading": "在工作里，权杖国王关注目标、执行力和项目推进。它适合用来判断当前资源、节奏和下一步行动。",
    "healingReading": "在疗愈层面，权杖国王提醒你把能量落到一个小行动里。",
    "actionAdvice": "今天围绕“行动”完成一个 24 小时内可执行的小动作。"
  },
  {
    "id": "swords-01-ace",
    "name": "宝剑王牌",
    "suit": "swords",
    "arcana": "minor",
    "image": "/packages/tarot-assets/assets/tarot/swords-01-ace.jpg",
    "keywords": [
      "清明",
      "开始",
      "种子"
    ],
    "upright": "宝剑王牌把“思考、沟通、判断和焦虑模式”带到王牌的阶段：新的能量入口正在出现，适合先保护这个种子。",
    "reversed": "逆位时，宝剑王牌提示：机会还在萌芽，暂时不宜急着证明结果。",
    "loveReading": "在感情里，宝剑王牌关注沟通、误会和想法的拉扯。它提醒你先看见互动里的真实感受，再决定靠近或暂停。",
    "workReading": "在工作里，宝剑王牌关注判断、信息、表达和决策压力。它适合用来判断当前资源、节奏和下一步行动。",
    "healingReading": "在疗愈层面，宝剑王牌提醒你区分事实和想象，减少反复内耗。",
    "actionAdvice": "今天围绕“清明”完成一个 24 小时内可执行的小动作。"
  },
  {
    "id": "swords-02-two",
    "name": "宝剑二",
    "suit": "swords",
    "arcana": "minor",
    "image": "/packages/tarot-assets/assets/tarot/swords-02-two.jpg",
    "keywords": [
      "清明",
      "选择",
      "互动"
    ],
    "upright": "宝剑二把“思考、沟通、判断和焦虑模式”带到二的阶段：两个方向或两个人之间的互动成为重点。",
    "reversed": "逆位时，宝剑二提示：平衡被打破，先看见自己在哪件事上摇摆。",
    "loveReading": "在感情里，宝剑二关注沟通、误会和想法的拉扯。它提醒你先看见互动里的真实感受，再决定靠近或暂停。",
    "workReading": "在工作里，宝剑二关注判断、信息、表达和决策压力。它适合用来判断当前资源、节奏和下一步行动。",
    "healingReading": "在疗愈层面，宝剑二提醒你区分事实和想象，减少反复内耗。",
    "actionAdvice": "今天围绕“清明”完成一个 24 小时内可执行的小动作。"
  },
  {
    "id": "swords-03-three",
    "name": "宝剑三",
    "suit": "swords",
    "arcana": "minor",
    "image": "/packages/tarot-assets/assets/tarot/swords-03-three.jpg",
    "keywords": [
      "心痛",
      "真相",
      "释放"
    ],
    "upright": "这张牌指向刺痛的真相，适合温柔承认受伤。",
    "reversed": "伤口正在松动，但不要急着装作已经没事。",
    "loveReading": "在感情里，宝剑三关注沟通、误会和想法的拉扯。它提醒你先看见互动里的真实感受，再决定靠近或暂停。",
    "workReading": "在工作里，宝剑三关注判断、信息、表达和决策压力。它适合用来判断当前资源、节奏和下一步行动。",
    "healingReading": "在疗愈层面，宝剑三提醒你区分事实和想象，减少反复内耗。",
    "actionAdvice": "今天围绕“心痛”完成一个 24 小时内可执行的小动作。"
  },
  {
    "id": "swords-04-four",
    "name": "宝剑四",
    "suit": "swords",
    "arcana": "minor",
    "image": "/packages/tarot-assets/assets/tarot/swords-04-four.jpg",
    "keywords": [
      "清明",
      "稳定",
      "停顿"
    ],
    "upright": "宝剑四把“思考、沟通、判断和焦虑模式”带到四的阶段：稳定结构正在形成，但也可能带来停顿。",
    "reversed": "逆位时，宝剑四提示：安全感不足或结构太紧，需要给自己一点流动空间。",
    "loveReading": "在感情里，宝剑四关注沟通、误会和想法的拉扯。它提醒你先看见互动里的真实感受，再决定靠近或暂停。",
    "workReading": "在工作里，宝剑四关注判断、信息、表达和决策压力。它适合用来判断当前资源、节奏和下一步行动。",
    "healingReading": "在疗愈层面，宝剑四提醒你区分事实和想象，减少反复内耗。",
    "actionAdvice": "今天围绕“清明”完成一个 24 小时内可执行的小动作。"
  },
  {
    "id": "swords-05-five",
    "name": "宝剑五",
    "suit": "swords",
    "arcana": "minor",
    "image": "/packages/tarot-assets/assets/tarot/swords-05-five.jpg",
    "keywords": [
      "清明",
      "冲突",
      "失衡"
    ],
    "upright": "宝剑五把“思考、沟通、判断和焦虑模式”带到五的阶段：冲突或失衡浮现，它不是结论，而是需要被处理的信号。",
    "reversed": "逆位时，宝剑五提示：你可能困在消耗里，先减少无效对抗。",
    "loveReading": "在感情里，宝剑五关注沟通、误会和想法的拉扯。它提醒你先看见互动里的真实感受，再决定靠近或暂停。",
    "workReading": "在工作里，宝剑五关注判断、信息、表达和决策压力。它适合用来判断当前资源、节奏和下一步行动。",
    "healingReading": "在疗愈层面，宝剑五提醒你区分事实和想象，减少反复内耗。",
    "actionAdvice": "今天围绕“清明”完成一个 24 小时内可执行的小动作。"
  },
  {
    "id": "swords-06-six",
    "name": "宝剑六",
    "suit": "swords",
    "arcana": "minor",
    "image": "/packages/tarot-assets/assets/tarot/swords-06-six.jpg",
    "keywords": [
      "清明",
      "修复",
      "回流"
    ],
    "upright": "宝剑六把“思考、沟通、判断和焦虑模式”带到六的阶段：能量开始回流，适合接受支持或做一次温和修复。",
    "reversed": "逆位时，宝剑六提示：旧经验影响现在，别让回忆替你决定当下。",
    "loveReading": "在感情里，宝剑六关注沟通、误会和想法的拉扯。它提醒你先看见互动里的真实感受，再决定靠近或暂停。",
    "workReading": "在工作里，宝剑六关注判断、信息、表达和决策压力。它适合用来判断当前资源、节奏和下一步行动。",
    "healingReading": "在疗愈层面，宝剑六提醒你区分事实和想象，减少反复内耗。",
    "actionAdvice": "今天围绕“清明”完成一个 24 小时内可执行的小动作。"
  },
  {
    "id": "swords-07-seven",
    "name": "宝剑七",
    "suit": "swords",
    "arcana": "minor",
    "image": "/packages/tarot-assets/assets/tarot/swords-07-seven.jpg",
    "keywords": [
      "清明",
      "评估",
      "防御"
    ],
    "upright": "宝剑七把“思考、沟通、判断和焦虑模式”带到七的阶段：需要评估投入与回报，也要看见自己的防御。",
    "reversed": "逆位时，宝剑七提示：过度防备或等待太久，容易让行动停住。",
    "loveReading": "在感情里，宝剑七关注沟通、误会和想法的拉扯。它提醒你先看见互动里的真实感受，再决定靠近或暂停。",
    "workReading": "在工作里，宝剑七关注判断、信息、表达和决策压力。它适合用来判断当前资源、节奏和下一步行动。",
    "healingReading": "在疗愈层面，宝剑七提醒你区分事实和想象，减少反复内耗。",
    "actionAdvice": "今天围绕“清明”完成一个 24 小时内可执行的小动作。"
  },
  {
    "id": "swords-08-eight",
    "name": "宝剑八",
    "suit": "swords",
    "arcana": "minor",
    "image": "/packages/tarot-assets/assets/tarot/swords-08-eight.jpg",
    "keywords": [
      "受限",
      "想太多",
      "困住"
    ],
    "upright": "你感到被困住，很多限制可能来自想象中的后果。",
    "reversed": "你正在找到松绑的入口，先从一个小选择开始。",
    "loveReading": "在感情里，宝剑八关注沟通、误会和想法的拉扯。它提醒你先看见互动里的真实感受，再决定靠近或暂停。",
    "workReading": "在工作里，宝剑八关注判断、信息、表达和决策压力。它适合用来判断当前资源、节奏和下一步行动。",
    "healingReading": "在疗愈层面，宝剑八提醒你区分事实和想象，减少反复内耗。",
    "actionAdvice": "今天围绕“受限”完成一个 24 小时内可执行的小动作。"
  },
  {
    "id": "swords-09-nine",
    "name": "宝剑九",
    "suit": "swords",
    "arcana": "minor",
    "image": "/packages/tarot-assets/assets/tarot/swords-09-nine.jpg",
    "keywords": [
      "焦虑",
      "失眠",
      "反复确认"
    ],
    "upright": "焦虑正在放大问题，先把事实和猜测分开。",
    "reversed": "焦虑开始被看见，适合求助或做一次清晰记录。",
    "loveReading": "在感情里，宝剑九关注沟通、误会和想法的拉扯。它提醒你先看见互动里的真实感受，再决定靠近或暂停。",
    "workReading": "在工作里，宝剑九关注判断、信息、表达和决策压力。它适合用来判断当前资源、节奏和下一步行动。",
    "healingReading": "在疗愈层面，宝剑九提醒你区分事实和想象，减少反复内耗。",
    "actionAdvice": "今天围绕“焦虑”完成一个 24 小时内可执行的小动作。"
  },
  {
    "id": "swords-10-ten",
    "name": "宝剑十",
    "suit": "swords",
    "arcana": "minor",
    "image": "/packages/tarot-assets/assets/tarot/swords-10-ten.jpg",
    "keywords": [
      "结束",
      "疲惫",
      "放下"
    ],
    "upright": "某种消耗已经到达临界点，需要停止继续加压。",
    "reversed": "最难的部分正在过去，你可以慢慢恢复。",
    "loveReading": "在感情里，宝剑十关注沟通、误会和想法的拉扯。它提醒你先看见互动里的真实感受，再决定靠近或暂停。",
    "workReading": "在工作里，宝剑十关注判断、信息、表达和决策压力。它适合用来判断当前资源、节奏和下一步行动。",
    "healingReading": "在疗愈层面，宝剑十提醒你区分事实和想象，减少反复内耗。",
    "actionAdvice": "今天围绕“结束”完成一个 24 小时内可执行的小动作。"
  },
  {
    "id": "swords-11-page",
    "name": "宝剑侍从",
    "suit": "swords",
    "arcana": "minor",
    "image": "/packages/tarot-assets/assets/tarot/swords-11-page.jpg",
    "keywords": [
      "清明",
      "学习",
      "好奇"
    ],
    "upright": "宝剑侍从把“思考、沟通、判断和焦虑模式”带到侍从的阶段：像初学者一样接收讯息，适合提问和观察。",
    "reversed": "逆位时，宝剑侍从提示：信息不成熟，别急着把一个信号当成最终答案。",
    "loveReading": "在感情里，宝剑侍从关注沟通、误会和想法的拉扯。它提醒你先看见互动里的真实感受，再决定靠近或暂停。",
    "workReading": "在工作里，宝剑侍从关注判断、信息、表达和决策压力。它适合用来判断当前资源、节奏和下一步行动。",
    "healingReading": "在疗愈层面，宝剑侍从提醒你区分事实和想象，减少反复内耗。",
    "actionAdvice": "今天围绕“清明”完成一个 24 小时内可执行的小动作。"
  },
  {
    "id": "swords-12-knight",
    "name": "宝剑骑士",
    "suit": "swords",
    "arcana": "minor",
    "image": "/packages/tarot-assets/assets/tarot/swords-12-knight.jpg",
    "keywords": [
      "清明",
      "推进",
      "追求"
    ],
    "upright": "宝剑骑士把“思考、沟通、判断和焦虑模式”带到骑士的阶段：行动正在加速，关键是选择合适节奏。",
    "reversed": "逆位时，宝剑骑士提示：过快或过慢都会失衡，先确认动机。",
    "loveReading": "在感情里，宝剑骑士关注沟通、误会和想法的拉扯。它提醒你先看见互动里的真实感受，再决定靠近或暂停。",
    "workReading": "在工作里，宝剑骑士关注判断、信息、表达和决策压力。它适合用来判断当前资源、节奏和下一步行动。",
    "healingReading": "在疗愈层面，宝剑骑士提醒你区分事实和想象，减少反复内耗。",
    "actionAdvice": "今天围绕“清明”完成一个 24 小时内可执行的小动作。"
  },
  {
    "id": "swords-13-queen",
    "name": "宝剑王后",
    "suit": "swords",
    "arcana": "minor",
    "image": "/packages/tarot-assets/assets/tarot/swords-13-queen.jpg",
    "keywords": [
      "清明",
      "承接",
      "滋养"
    ],
    "upright": "宝剑王后把“思考、沟通、判断和焦虑模式”带到王后的阶段：成熟地承接感受、资源或关系，是这张牌的重点。",
    "reversed": "逆位时，宝剑王后提示：过度承接容易变成消耗，需要把能量留给自己。",
    "loveReading": "在感情里，宝剑王后关注沟通、误会和想法的拉扯。它提醒你先看见互动里的真实感受，再决定靠近或暂停。",
    "workReading": "在工作里，宝剑王后关注判断、信息、表达和决策压力。它适合用来判断当前资源、节奏和下一步行动。",
    "healingReading": "在疗愈层面，宝剑王后提醒你区分事实和想象，减少反复内耗。",
    "actionAdvice": "今天围绕“清明”完成一个 24 小时内可执行的小动作。"
  },
  {
    "id": "swords-14-king",
    "name": "宝剑国王",
    "suit": "swords",
    "arcana": "minor",
    "image": "/packages/tarot-assets/assets/tarot/swords-14-king.jpg",
    "keywords": [
      "清明",
      "掌控",
      "成熟"
    ],
    "upright": "宝剑国王把“思考、沟通、判断和焦虑模式”带到国王的阶段：需要成熟决策和稳定掌控，不再只凭情绪反应。",
    "reversed": "逆位时，宝剑国王提示：控制过强会压住真实感受，先让判断更柔软一点。",
    "loveReading": "在感情里，宝剑国王关注沟通、误会和想法的拉扯。它提醒你先看见互动里的真实感受，再决定靠近或暂停。",
    "workReading": "在工作里，宝剑国王关注判断、信息、表达和决策压力。它适合用来判断当前资源、节奏和下一步行动。",
    "healingReading": "在疗愈层面，宝剑国王提醒你区分事实和想象，减少反复内耗。",
    "actionAdvice": "今天围绕“清明”完成一个 24 小时内可执行的小动作。"
  },
  {
    "id": "pentacles-01-ace",
    "name": "星币王牌",
    "suit": "pentacles",
    "arcana": "minor",
    "image": "/packages/tarot-assets/assets/tarot/pentacles-01-ace.jpg",
    "keywords": [
      "稳定",
      "开始",
      "种子"
    ],
    "upright": "星币王牌把“现实基础、时间、资源和长期承诺”带到王牌的阶段：新的能量入口正在出现，适合先保护这个种子。",
    "reversed": "逆位时，星币王牌提示：机会还在萌芽，暂时不宜急着证明结果。",
    "loveReading": "在感情里，星币王牌关注现实承诺、相处节奏和安全感。它提醒你先看见互动里的真实感受，再决定靠近或暂停。",
    "workReading": "在工作里，星币王牌关注资源、收入、技能和长期建设。它适合用来判断当前资源、节奏和下一步行动。",
    "healingReading": "在疗愈层面，星币王牌提醒你回到身体、生活秩序和可持续节奏。",
    "actionAdvice": "今天围绕“稳定”完成一个 24 小时内可执行的小动作。"
  },
  {
    "id": "pentacles-02-two",
    "name": "星币二",
    "suit": "pentacles",
    "arcana": "minor",
    "image": "/packages/tarot-assets/assets/tarot/pentacles-02-two.jpg",
    "keywords": [
      "稳定",
      "选择",
      "互动"
    ],
    "upright": "星币二把“现实基础、时间、资源和长期承诺”带到二的阶段：两个方向或两个人之间的互动成为重点。",
    "reversed": "逆位时，星币二提示：平衡被打破，先看见自己在哪件事上摇摆。",
    "loveReading": "在感情里，星币二关注现实承诺、相处节奏和安全感。它提醒你先看见互动里的真实感受，再决定靠近或暂停。",
    "workReading": "在工作里，星币二关注资源、收入、技能和长期建设。它适合用来判断当前资源、节奏和下一步行动。",
    "healingReading": "在疗愈层面，星币二提醒你回到身体、生活秩序和可持续节奏。",
    "actionAdvice": "今天围绕“稳定”完成一个 24 小时内可执行的小动作。"
  },
  {
    "id": "pentacles-03-three",
    "name": "星币三",
    "suit": "pentacles",
    "arcana": "minor",
    "image": "/packages/tarot-assets/assets/tarot/pentacles-03-three.jpg",
    "keywords": [
      "稳定",
      "扩展",
      "表达"
    ],
    "upright": "星币三把“现实基础、时间、资源和长期承诺”带到三的阶段：事情开始向外扩展，需要表达、协作或整理成果。",
    "reversed": "逆位时，星币三提示：表达受阻或期待落空，需要重新校准配合方式。",
    "loveReading": "在感情里，星币三关注现实承诺、相处节奏和安全感。它提醒你先看见互动里的真实感受，再决定靠近或暂停。",
    "workReading": "在工作里，星币三关注资源、收入、技能和长期建设。它适合用来判断当前资源、节奏和下一步行动。",
    "healingReading": "在疗愈层面，星币三提醒你回到身体、生活秩序和可持续节奏。",
    "actionAdvice": "今天围绕“稳定”完成一个 24 小时内可执行的小动作。"
  },
  {
    "id": "pentacles-04-four",
    "name": "星币四",
    "suit": "pentacles",
    "arcana": "minor",
    "image": "/packages/tarot-assets/assets/tarot/pentacles-04-four.jpg",
    "keywords": [
      "抓紧",
      "安全感",
      "保守"
    ],
    "upright": "你在努力守住安全感，但也可能抓得太紧。",
    "reversed": "松手不等于失去，适合重新分配资源和注意力。",
    "loveReading": "在感情里，星币四关注现实承诺、相处节奏和安全感。它提醒你先看见互动里的真实感受，再决定靠近或暂停。",
    "workReading": "在工作里，星币四关注资源、收入、技能和长期建设。它适合用来判断当前资源、节奏和下一步行动。",
    "healingReading": "在疗愈层面，星币四提醒你回到身体、生活秩序和可持续节奏。",
    "actionAdvice": "今天围绕“抓紧”完成一个 24 小时内可执行的小动作。"
  },
  {
    "id": "pentacles-05-five",
    "name": "星币五",
    "suit": "pentacles",
    "arcana": "minor",
    "image": "/packages/tarot-assets/assets/tarot/pentacles-05-five.jpg",
    "keywords": [
      "稳定",
      "冲突",
      "失衡"
    ],
    "upright": "星币五把“现实基础、时间、资源和长期承诺”带到五的阶段：冲突或失衡浮现，它不是结论，而是需要被处理的信号。",
    "reversed": "逆位时，星币五提示：你可能困在消耗里，先减少无效对抗。",
    "loveReading": "在感情里，星币五关注现实承诺、相处节奏和安全感。它提醒你先看见互动里的真实感受，再决定靠近或暂停。",
    "workReading": "在工作里，星币五关注资源、收入、技能和长期建设。它适合用来判断当前资源、节奏和下一步行动。",
    "healingReading": "在疗愈层面，星币五提醒你回到身体、生活秩序和可持续节奏。",
    "actionAdvice": "今天围绕“稳定”完成一个 24 小时内可执行的小动作。"
  },
  {
    "id": "pentacles-06-six",
    "name": "星币六",
    "suit": "pentacles",
    "arcana": "minor",
    "image": "/packages/tarot-assets/assets/tarot/pentacles-06-six.jpg",
    "keywords": [
      "稳定",
      "修复",
      "回流"
    ],
    "upright": "星币六把“现实基础、时间、资源和长期承诺”带到六的阶段：能量开始回流，适合接受支持或做一次温和修复。",
    "reversed": "逆位时，星币六提示：旧经验影响现在，别让回忆替你决定当下。",
    "loveReading": "在感情里，星币六关注现实承诺、相处节奏和安全感。它提醒你先看见互动里的真实感受，再决定靠近或暂停。",
    "workReading": "在工作里，星币六关注资源、收入、技能和长期建设。它适合用来判断当前资源、节奏和下一步行动。",
    "healingReading": "在疗愈层面，星币六提醒你回到身体、生活秩序和可持续节奏。",
    "actionAdvice": "今天围绕“稳定”完成一个 24 小时内可执行的小动作。"
  },
  {
    "id": "pentacles-07-seven",
    "name": "星币七",
    "suit": "pentacles",
    "arcana": "minor",
    "image": "/packages/tarot-assets/assets/tarot/pentacles-07-seven.jpg",
    "keywords": [
      "等待",
      "评估",
      "长期"
    ],
    "upright": "你正在等待结果，适合评估投入是否仍然值得。",
    "reversed": "别把沉没成本当成继续消耗的理由。",
    "loveReading": "在感情里，星币七关注现实承诺、相处节奏和安全感。它提醒你先看见互动里的真实感受，再决定靠近或暂停。",
    "workReading": "在工作里，星币七关注资源、收入、技能和长期建设。它适合用来判断当前资源、节奏和下一步行动。",
    "healingReading": "在疗愈层面，星币七提醒你回到身体、生活秩序和可持续节奏。",
    "actionAdvice": "今天围绕“等待”完成一个 24 小时内可执行的小动作。"
  },
  {
    "id": "pentacles-08-eight",
    "name": "星币八",
    "suit": "pentacles",
    "arcana": "minor",
    "image": "/packages/tarot-assets/assets/tarot/pentacles-08-eight.jpg",
    "keywords": [
      "稳定",
      "推进",
      "练习"
    ],
    "upright": "星币八把“现实基础、时间、资源和长期承诺”带到八的阶段：事情进入调整和推进阶段，重复练习会带来改变。",
    "reversed": "逆位时，星币八提示：推进受阻时，先看流程是否需要简化。",
    "loveReading": "在感情里，星币八关注现实承诺、相处节奏和安全感。它提醒你先看见互动里的真实感受，再决定靠近或暂停。",
    "workReading": "在工作里，星币八关注资源、收入、技能和长期建设。它适合用来判断当前资源、节奏和下一步行动。",
    "healingReading": "在疗愈层面，星币八提醒你回到身体、生活秩序和可持续节奏。",
    "actionAdvice": "今天围绕“稳定”完成一个 24 小时内可执行的小动作。"
  },
  {
    "id": "pentacles-09-nine",
    "name": "星币九",
    "suit": "pentacles",
    "arcana": "minor",
    "image": "/packages/tarot-assets/assets/tarot/pentacles-09-nine.jpg",
    "keywords": [
      "独立",
      "价值",
      "稳定"
    ],
    "upright": "你的价值感正在回到自己身上，适合肯定长期积累。",
    "reversed": "别用外界评价衡量全部自我价值。",
    "loveReading": "在感情里，星币九关注现实承诺、相处节奏和安全感。它提醒你先看见互动里的真实感受，再决定靠近或暂停。",
    "workReading": "在工作里，星币九关注资源、收入、技能和长期建设。它适合用来判断当前资源、节奏和下一步行动。",
    "healingReading": "在疗愈层面，星币九提醒你回到身体、生活秩序和可持续节奏。",
    "actionAdvice": "今天围绕“独立”完成一个 24 小时内可执行的小动作。"
  },
  {
    "id": "pentacles-10-ten",
    "name": "星币十",
    "suit": "pentacles",
    "arcana": "minor",
    "image": "/packages/tarot-assets/assets/tarot/pentacles-10-ten.jpg",
    "keywords": [
      "稳定",
      "完成",
      "累积"
    ],
    "upright": "星币十把“现实基础、时间、资源和长期承诺”带到十的阶段：一个循环接近完成，结果来自长期累积。",
    "reversed": "逆位时，星币十提示：旧循环负担过重，需要结束或重新分配责任。",
    "loveReading": "在感情里，星币十关注现实承诺、相处节奏和安全感。它提醒你先看见互动里的真实感受，再决定靠近或暂停。",
    "workReading": "在工作里，星币十关注资源、收入、技能和长期建设。它适合用来判断当前资源、节奏和下一步行动。",
    "healingReading": "在疗愈层面，星币十提醒你回到身体、生活秩序和可持续节奏。",
    "actionAdvice": "今天围绕“稳定”完成一个 24 小时内可执行的小动作。"
  },
  {
    "id": "pentacles-11-page",
    "name": "星币侍从",
    "suit": "pentacles",
    "arcana": "minor",
    "image": "/packages/tarot-assets/assets/tarot/pentacles-11-page.jpg",
    "keywords": [
      "稳定",
      "学习",
      "好奇"
    ],
    "upright": "星币侍从把“现实基础、时间、资源和长期承诺”带到侍从的阶段：像初学者一样接收讯息，适合提问和观察。",
    "reversed": "逆位时，星币侍从提示：信息不成熟，别急着把一个信号当成最终答案。",
    "loveReading": "在感情里，星币侍从关注现实承诺、相处节奏和安全感。它提醒你先看见互动里的真实感受，再决定靠近或暂停。",
    "workReading": "在工作里，星币侍从关注资源、收入、技能和长期建设。它适合用来判断当前资源、节奏和下一步行动。",
    "healingReading": "在疗愈层面，星币侍从提醒你回到身体、生活秩序和可持续节奏。",
    "actionAdvice": "今天围绕“稳定”完成一个 24 小时内可执行的小动作。"
  },
  {
    "id": "pentacles-12-knight",
    "name": "星币骑士",
    "suit": "pentacles",
    "arcana": "minor",
    "image": "/packages/tarot-assets/assets/tarot/pentacles-12-knight.jpg",
    "keywords": [
      "稳定",
      "推进",
      "追求"
    ],
    "upright": "星币骑士把“现实基础、时间、资源和长期承诺”带到骑士的阶段：行动正在加速，关键是选择合适节奏。",
    "reversed": "逆位时，星币骑士提示：过快或过慢都会失衡，先确认动机。",
    "loveReading": "在感情里，星币骑士关注现实承诺、相处节奏和安全感。它提醒你先看见互动里的真实感受，再决定靠近或暂停。",
    "workReading": "在工作里，星币骑士关注资源、收入、技能和长期建设。它适合用来判断当前资源、节奏和下一步行动。",
    "healingReading": "在疗愈层面，星币骑士提醒你回到身体、生活秩序和可持续节奏。",
    "actionAdvice": "今天围绕“稳定”完成一个 24 小时内可执行的小动作。"
  },
  {
    "id": "pentacles-13-queen",
    "name": "星币王后",
    "suit": "pentacles",
    "arcana": "minor",
    "image": "/packages/tarot-assets/assets/tarot/pentacles-13-queen.jpg",
    "keywords": [
      "稳定",
      "承接",
      "滋养"
    ],
    "upright": "星币王后把“现实基础、时间、资源和长期承诺”带到王后的阶段：成熟地承接感受、资源或关系，是这张牌的重点。",
    "reversed": "逆位时，星币王后提示：过度承接容易变成消耗，需要把能量留给自己。",
    "loveReading": "在感情里，星币王后关注现实承诺、相处节奏和安全感。它提醒你先看见互动里的真实感受，再决定靠近或暂停。",
    "workReading": "在工作里，星币王后关注资源、收入、技能和长期建设。它适合用来判断当前资源、节奏和下一步行动。",
    "healingReading": "在疗愈层面，星币王后提醒你回到身体、生活秩序和可持续节奏。",
    "actionAdvice": "今天围绕“稳定”完成一个 24 小时内可执行的小动作。"
  },
  {
    "id": "pentacles-14-king",
    "name": "星币国王",
    "suit": "pentacles",
    "arcana": "minor",
    "image": "/packages/tarot-assets/assets/tarot/pentacles-14-king.jpg",
    "keywords": [
      "稳定",
      "掌控",
      "成熟"
    ],
    "upright": "星币国王把“现实基础、时间、资源和长期承诺”带到国王的阶段：需要成熟决策和稳定掌控，不再只凭情绪反应。",
    "reversed": "逆位时，星币国王提示：控制过强会压住真实感受，先让判断更柔软一点。",
    "loveReading": "在感情里，星币国王关注现实承诺、相处节奏和安全感。它提醒你先看见互动里的真实感受，再决定靠近或暂停。",
    "workReading": "在工作里，星币国王关注资源、收入、技能和长期建设。它适合用来判断当前资源、节奏和下一步行动。",
    "healingReading": "在疗愈层面，星币国王提醒你回到身体、生活秩序和可持续节奏。",
    "actionAdvice": "今天围绕“稳定”完成一个 24 小时内可执行的小动作。"
  }
]

const scenes = [
  { id: "love", name: "感情", hint: "推荐爱情十字、二选一和三张牌阵。" },
  { id: "work", name: "工作", hint: "推荐事业财富牌阵，也可使用三张牌阵梳理阶段。" },
  { id: "other", name: "其他", hint: "推荐三张牌阵，也可用二选一抉择牌阵。" }
]

const spreads = [
  {
    id: "three",
    name: "三张牌阵",
    badge: "通用",
    scenes: ["love", "work", "other"],
    summary: "过去 / 现在 / 未来，适合快速梳理阶段变化。",
    positions: ["过去", "现在", "未来"]
  },
  {
    id: "cross",
    name: "爱情十字牌阵",
    badge: "推荐",
    scenes: ["love"],
    summary: "看见现状、阻碍、对方态度、建议和可能走向。",
    positions: ["现状", "阻碍", "对方态度", "建议", "可能走向"]
  },
  {
    id: "choice",
    name: "二选一抉择牌阵",
    badge: "可选",
    scenes: ["love", "work", "other"],
    summary: "比较两个选择的机会、代价和更适合的行动。",
    positions: ["选择 A", "选择 B", "建议"]
  },
  {
    id: "career",
    name: "事业财富牌阵",
    badge: "工作",
    scenes: ["work"],
    summary: "适合工作选择、机会判断、收入压力和资源整理。",
    positions: ["当前资源", "主要压力", "下一步"]
  }
]

const emotionTemplates = {
  love: {
    tags: ["焦虑", "期待", "内耗"],
    mirror: "你像是在不确定里反复确认，对方的变化让你很难安定下来。",
    action: "今天先不做重大决定，只完成一次清晰表达，或给自己一个暂停观察窗口。",
    writing: "写下：这段关系里，我真正想确认的是什么？"
  },
  work: {
    tags: ["犹豫", "压力", "疲惫"],
    mirror: "你可能已经承受了一段时间的压力，真正需要的是把问题拆小。",
    action: "今天只推进一个最小任务，并把需要沟通的边界写成一句话。",
    writing: "写下：这件事里，我能控制的最小一步是什么？"
  },
  wealth: {
    tags: ["焦虑", "犹豫", "期待"],
    mirror: "你在期待更稳定的结果，也担心自己做错选择。",
    action: "今天先列出必要支出和可延后决定，不在情绪最高点做承诺。",
    writing: "写下：我现在害怕失去的具体是什么？"
  },
  other: {
    tags: ["失落", "犹豫", "平静"],
    mirror: "你正在给混乱找一个出口，能说出来已经是整理的开始。",
    action: "今天先做一次 4-6 呼吸，再选择一件 10 分钟内能完成的小事。",
    writing: "写下：如果不急着解决，我此刻最需要被照顾的是什么？"
  }
}

const sampleDiaries = [
  {
    id: "sample-love",
    title: "今天的关系记录",
    date: "2026.05.30 23:18",
    sceneName: "感情",
    emotionTags: ["焦虑", "期待", "内耗"],
    summary: "你在等待回应时产生焦虑，当前更适合暂停追问，先整理真实需求。",
    userInput: "我害怕自己又变成一直主动的那个人，也担心不主动就会失去连接。",
    cardsText: "关系走向：恋人正位、月亮逆位、节制正位。",
    suggestion: "三天后回看：我是在回应事实，还是在回应想象？"
  },
  {
    id: "sample-work",
    title: "工作选择记录",
    date: "2026.05.29 20:12",
    sceneName: "工作",
    emotionTags: ["犹豫", "压力"],
    summary: "当前更适合把选择拆成可验证的小试探，而不是一次性决定全部。",
    userInput: "我担心换方向之后不稳定，但现在的状态也很消耗。",
    cardsText: "事业财富：星币七正位、力量正位、太阳逆位。",
    suggestion: "先做一次低风险沟通，再决定下一步。"
  }
]

module.exports = {
  tarotDeck,
  scenes,
  spreads,
  emotionTemplates,
  sampleDiaries
}
