import React, {useState} from 'react';
import {
  FlatList,
  Image,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import type {ImageSourcePropType} from 'react-native';
import {SafeAreaProvider, SafeAreaView} from 'react-native-safe-area-context';

type Tab = 'chats' | 'calls' | 'contacts';
type Screen = {name: 'home'} | {name: 'chat'; contact: ChatContact};

type ChatContact = {
  id: string;
  name: string;
  surname: string;
  time: string;
  preview: string;
  image: ImageSourcePropType;
  unread?: number;
};

type Call = {
  id: string;
  name: string;
  date: string;
  time: string;
  incoming: boolean;
  image: ImageSourcePropType;
};

type Contact = {
  id: string;
  name: string;
  status: string;
  image: ImageSourcePropType;
};

type Message = {
  id: string;
  text: string;
  mine: boolean;
  time: string;
};

const colors = {
  ink: '#17211b',
  muted: '#6a766e',
  line: '#e3e8e4',
  canvas: '#f7f9f7',
  surface: '#ffffff',
  green: '#075e54',
  greenSoft: '#e5f0ed',
  teal: '#128c7e',
  bubble: '#dcf8c6',
  incoming: '#ffffff',
  accent: '#25d366',
};

const chatContacts: ChatContact[] = [
  {
    id: 'amanda-grant',
    name: 'Amanda',
    surname: 'Grant',
    time: '8:54 AM',
    preview: 'Can I come over to yours tonight?',
    unread: 2,
    image: require('./app/images/image1.jpeg'),
  },
  {
    id: 'gloria-hicks',
    name: 'Gloria',
    surname: 'Hicks',
    time: '11:56 AM',
    preview: 'viverra pede',
    image: require('./app/images/image2.jpeg'),
  },
  {
    id: 'gloria-lane',
    name: 'Gloria',
    surname: 'Lane',
    time: '1:34 AM',
    preview: 'vehicula consequat',
    image: require('./app/images/image3.jpeg'),
  },
  {
    id: 'linda-wells',
    name: 'Linda',
    surname: 'Wells',
    time: '2:12 AM',
    preview: 'vehicula',
    image: require('./app/images/image4.jpeg'),
  },
  {
    id: 'samantha-lee',
    name: 'Samantha',
    surname: 'Lee',
    time: '11:23 AM',
    preview: 'amet',
    image: require('./app/images/image5.jpeg'),
  },
  {
    id: 'irene-garcia',
    name: 'Irene',
    surname: 'Garcia',
    time: '3:15 PM',
    preview: 'quis orci nullam',
    image: require('./app/images/image6.jpeg'),
  },
  {
    id: 'marilyn-grant',
    name: 'Marilyn',
    surname: 'Grant',
    time: '5:06 AM',
    preview: 'felis sed lacus',
    image: require('./app/images/image7.jpeg'),
  },
  {
    id: 'maya-carr',
    name: 'Maya',
    surname: 'Carr',
    time: '11:28 PM',
    preview: 'purus aliquet at',
    image: require('./app/images/image8.jpeg'),
  },
  {
    id: 'paula-kelly',
    name: 'Paula',
    surname: 'Kelly',
    time: '12:36 PM',
    preview: 'aliquam lacus morbi',
    image: require('./app/images/image9.jpeg'),
  },
  {
    id: 'ruth-carr',
    name: 'Ruth',
    surname: 'Carr',
    time: '3:05 PM',
    preview: 'integer tincidunt',
    image: require('./app/images/image10.jpeg'),
  },
  {
    id: 'christy-cook',
    name: 'Christy',
    surname: 'Cook',
    time: '10:02 PM',
    preview: 'parturient montes nascetur',
    image: require('./app/images/image11.jpeg'),
  },
];

const calls: Call[] = [
  {
    id: 'bruce-1',
    name: 'Bruce',
    date: '25 Feb 2016',
    time: '5:46 PM',
    incoming: true,
    image: require('./app/images/image11.jpeg'),
  },
  {
    id: 'albert-2',
    name: 'Albert',
    date: '31 Jan 2016',
    time: '12:38 PM',
    incoming: true,
    image: require('./app/images/image10.jpeg'),
  },
  {
    id: 'douglas-3',
    name: 'Douglas',
    date: '01 Jul 2016',
    time: '1:33 PM',
    incoming: true,
    image: require('./app/images/image9.jpeg'),
  },
  {
    id: 'eugene-4',
    name: 'Eugene',
    date: '19 Feb 2016',
    time: '3:59 AM',
    incoming: true,
    image: require('./app/images/image8.jpeg'),
  },
  {
    id: 'michael-5',
    name: 'Michael',
    date: '12 Apr 2016',
    time: '9:57 AM',
    incoming: true,
    image: require('./app/images/image7.jpeg'),
  },
  {
    id: 'william-6',
    name: 'William',
    date: '13 Aug 2016',
    time: '9:37 PM',
    incoming: false,
    image: require('./app/images/image6.jpeg'),
  },
  {
    id: 'joshua-7',
    name: 'Joshua',
    date: '17 Dec 2015',
    time: '4:32 AM',
    incoming: true,
    image: require('./app/images/image5.jpeg'),
  },
];

const contacts: Contact[] = [
  {
    id: 'g-eazy',
    name: 'G Eazy',
    status: 'I just need to be alone',
    image: require('./app/images/geasy.jpg'),
  },
  {
    id: 'eminem',
    name: 'Eminem',
    status: 'Available',
    image: require('./app/images/eminem.jpg'),
  },
  {
    id: 'kyle',
    name: 'Kyle',
    status: 'Lame friends hide your girls',
    image: require('./app/images/kyle.jpg'),
  },
  {
    id: 'devon',
    name: 'Devon Baldwin',
    status: 'Where are the avocados?',
    image: require('./app/images/devon.jpg'),
  },
];

const initialMessages: Message[] = [
  {
    id: 'welcome',
    text: 'When are we going to hang out?',
    mine: false,
    time: '8:53 AM',
  },
];

function App(): React.JSX.Element {
  const [screen, setScreen] = useState<Screen>({name: 'home'});

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.safeArea} edges={['top', 'bottom']}>
        <StatusBar barStyle="light-content" />
        {screen.name === 'home' ? (
          <HomeScreen onOpenChat={contact => setScreen({name: 'chat', contact})} />
        ) : (
          <ChatScreen contact={screen.contact} onBack={() => setScreen({name: 'home'})} />
        )}
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

function HomeScreen({onOpenChat}: {onOpenChat: (contact: ChatContact) => void}) {
  const [tab, setTab] = useState<Tab>('chats');

  return (
    <View style={styles.screen}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>WhatsApp</Text>
        <View style={styles.headerActions}>
          <HeaderAction label="Search" icon="⌕" />
          <HeaderAction label="More options" icon="⋮" />
        </View>
      </View>
      <View style={styles.tabs} accessibilityRole="tablist">
        <TabButton active={tab === 'chats'} label="Chats" onPress={() => setTab('chats')} />
        <TabButton active={tab === 'calls'} label="Calls" onPress={() => setTab('calls')} />
        <TabButton active={tab === 'contacts'} label="Contacts" onPress={() => setTab('contacts')} />
      </View>
      {tab === 'chats' ? (
        <FlatList
          data={chatContacts}
          keyExtractor={item => item.id}
          renderItem={({item}) => <ChatRow contact={item} onPress={() => onOpenChat(item)} />}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
        />
      ) : tab === 'calls' ? (
        <FlatList
          data={calls}
          keyExtractor={item => item.id}
          renderItem={({item}) => <CallRow call={item} />}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
        />
      ) : (
        <FlatList
          data={contacts}
          keyExtractor={item => item.id}
          renderItem={({item}) => <ContactRow contact={item} />}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
        />
      )}
    </View>
  );
}

function ChatScreen({contact, onBack}: {contact: ChatContact; onBack: () => void}) {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [draft, setDraft] = useState('');

  const sendMessage = () => {
    const text = draft.trim();
    if (!text) {
      return;
    }

    const message: Message = {
      id: `${Date.now()}`,
      text,
      mine: true,
      time: 'Now',
    };
    setMessages(current => [...current, message]);
    setDraft('');
    setTimeout(() => {
      setMessages(current => [
        ...current,
        {
          id: `${Date.now()}-reply`,
          text: 'I will check and get back to you.',
          mine: false,
          time: 'Now',
        },
      ]);
    }, 800);
  };

  return (
    <KeyboardAvoidingView
      style={styles.screen}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 8 : 0}>
      <View style={styles.chatHeader}>
        <Pressable
          accessibilityLabel="Back to chats"
          accessibilityRole="button"
          hitSlop={12}
          onPress={onBack}
          style={styles.backButton}>
          <Text style={styles.backIcon}>‹</Text>
        </Pressable>
        <Image source={contact.image} style={styles.chatAvatar} />
        <View style={styles.chatHeaderDetails}>
          <Text style={styles.chatName}>{contact.name}</Text>
          <Text style={styles.chatStatus}>online</Text>
        </View>
        <View style={styles.headerActions}>
          <HeaderAction label="Call" icon="☎" />
          <HeaderAction label="More options" icon="⋮" />
        </View>
      </View>
      <FlatList
        data={messages}
        keyExtractor={item => item.id}
        renderItem={({item}) => <MessageBubble message={item} />}
        contentContainerStyle={styles.messageList}
        showsVerticalScrollIndicator={false}
      />
      <View style={styles.composer}>
        <TextInput
          accessibilityLabel="Message"
          value={draft}
          onChangeText={setDraft}
          onSubmitEditing={sendMessage}
          placeholder="Write a message"
          placeholderTextColor={colors.muted}
          returnKeyType="send"
          style={styles.input}
        />
        <Pressable
          accessibilityLabel="Send message"
          accessibilityRole="button"
          onPress={sendMessage}
          style={({pressed}) => [styles.sendButton, pressed && styles.pressed]}>
          <Text style={styles.sendIcon}>↗</Text>
        </Pressable>
      </View>
    </KeyboardAvoidingView>
  );
}

function HeaderAction({label, icon}: {label: string; icon: string}) {
  return (
    <Pressable
      accessibilityLabel={label}
      accessibilityRole="button"
      hitSlop={8}
      onPress={() => undefined}
      style={({pressed}) => [styles.headerAction, pressed && styles.headerActionPressed]}>
      <Text style={styles.headerActionIcon}>{icon}</Text>
    </Pressable>
  );
}

function TabButton({active, label, onPress}: {active: boolean; label: string; onPress: () => void}) {
  return (
    <Pressable
      accessibilityRole="tab"
      accessibilityState={{selected: active}}
      onPress={onPress}
      style={[styles.tab, active && styles.activeTab]}>
      <Text style={[styles.tabLabel, active && styles.activeTabLabel]}>{label}</Text>
    </Pressable>
  );
}

function Avatar({image}: {image: ImageSourcePropType}) {
  return <Image source={image} style={styles.avatar} />;
}

function ChatRow({contact, onPress}: {contact: ChatContact; onPress: () => void}) {
  return (
    <Pressable
      accessibilityLabel={`Open chat with ${contact.name} ${contact.surname}`}
      accessibilityRole="button"
      onPress={onPress}
      style={({pressed}) => [styles.row, pressed && styles.rowPressed]}>
      <Avatar image={contact.image} />
      <View style={styles.rowCopy}>
        <View style={styles.rowTopline}>
          <Text style={styles.rowTitle}>
            {contact.name} {contact.surname}
          </Text>
          <Text style={styles.rowTime}>{contact.time}</Text>
        </View>
        <View style={styles.rowBottomline}>
          <Text numberOfLines={1} style={styles.rowPreview}>
            {contact.preview}
          </Text>
          {contact.unread ? <UnreadCount count={contact.unread} /> : null}
        </View>
      </View>
    </Pressable>
  );
}

function CallRow({call}: {call: Call}) {
  return (
    <Pressable
      accessibilityLabel={`Call ${call.name}`}
      accessibilityRole="button"
      onPress={() => undefined}
      style={({pressed}) => [styles.row, pressed && styles.rowPressed]}>
      <Avatar image={call.image} />
      <View style={styles.rowCopy}>
        <View style={styles.rowTopline}>
          <Text style={styles.rowTitle}>{call.name}</Text>
          <Text style={styles.rowTime}>{call.time}</Text>
        </View>
        <View style={styles.rowBottomline}>
          <Text style={styles.callMeta}>
            <Text style={call.incoming ? styles.incomingCall : styles.outgoingCall}>
              {call.incoming ? '↙' : '↗'}
            </Text>{' '}
            {call.date}
          </Text>
          <Text style={styles.callIcon}>☎</Text>
        </View>
      </View>
    </Pressable>
  );
}

function ContactRow({contact}: {contact: Contact}) {
  return (
    <Pressable
      accessibilityLabel={`Contact ${contact.name}`}
      accessibilityRole="button"
      onPress={() => undefined}
      style={({pressed}) => [styles.row, pressed && styles.rowPressed]}>
      <Avatar image={contact.image} />
      <View style={styles.rowCopy}>
        <Text style={styles.rowTitle}>{contact.name}</Text>
        <Text numberOfLines={1} style={styles.rowPreview}>
          {contact.status}
        </Text>
      </View>
      <Text style={styles.contactType}>MOBILE</Text>
    </Pressable>
  );
}

function MessageBubble({message}: {message: Message}) {
  return (
    <View style={[styles.messageLine, message.mine && styles.myMessageLine]}>
      <View style={[styles.messageBubble, message.mine ? styles.myBubble : styles.theirBubble]}>
        <Text style={styles.messageText}>{message.text}</Text>
        <Text style={styles.messageTime}>{message.time}</Text>
      </View>
    </View>
  );
}

function UnreadCount({count}: {count: number}) {
  return (
    <View style={styles.unread}>
      <Text style={styles.unreadText}>{count}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.green,
  },
  screen: {
    flex: 1,
    backgroundColor: colors.canvas,
  },
  header: {
    alignItems: 'center',
    backgroundColor: colors.green,
    flexDirection: 'row',
    justifyContent: 'space-between',
    minHeight: 64,
    paddingHorizontal: 20,
  },
  headerTitle: {
    color: colors.surface,
    fontSize: 22,
    fontWeight: '700',
    letterSpacing: 0.1,
  },
  headerActions: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: 8,
  },
  headerAction: {
    alignItems: 'center',
    borderRadius: 20,
    height: 40,
    justifyContent: 'center',
    width: 40,
  },
  headerActionPressed: {
    backgroundColor: '#0b715f',
  },
  headerActionIcon: {
    color: colors.surface,
    fontSize: 25,
    fontWeight: '400',
  },
  tabs: {
    backgroundColor: colors.green,
    flexDirection: 'row',
    paddingHorizontal: 10,
  },
  tab: {
    alignItems: 'center',
    borderBottomWidth: 3,
    borderBottomColor: 'transparent',
    flex: 1,
    minHeight: 48,
    justifyContent: 'center',
  },
  activeTab: {
    borderBottomColor: colors.accent,
  },
  tabLabel: {
    color: '#a8c9c3',
    fontSize: 14,
    fontWeight: '700',
  },
  activeTabLabel: {
    color: colors.surface,
  },
  listContent: {
    paddingBottom: 24,
  },
  row: {
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderBottomColor: colors.line,
    borderBottomWidth: StyleSheet.hairlineWidth,
    flexDirection: 'row',
    minHeight: 78,
    paddingHorizontal: 16,
    paddingVertical: 10,
  },
  rowPressed: {
    backgroundColor: colors.greenSoft,
  },
  avatar: {
    borderRadius: 28,
    height: 56,
    width: 56,
  },
  rowCopy: {
    flex: 1,
    marginLeft: 14,
    minWidth: 0,
  },
  rowTopline: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 6,
  },
  rowBottomline: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  rowTitle: {
    color: colors.ink,
    flex: 1,
    fontSize: 16,
    fontWeight: '700',
  },
  rowTime: {
    color: colors.muted,
    fontSize: 12,
    marginLeft: 12,
  },
  rowPreview: {
    color: colors.muted,
    flex: 1,
    fontSize: 14,
  },
  unread: {
    alignItems: 'center',
    backgroundColor: colors.teal,
    borderRadius: 10,
    height: 20,
    justifyContent: 'center',
    marginLeft: 8,
    minWidth: 20,
    paddingHorizontal: 5,
  },
  unreadText: {
    color: colors.surface,
    fontSize: 11,
    fontWeight: '700',
  },
  callMeta: {
    color: colors.muted,
    fontSize: 13,
  },
  incomingCall: {
    color: '#c74b55',
    fontWeight: '700',
  },
  outgoingCall: {
    color: colors.teal,
    fontWeight: '700',
  },
  callIcon: {
    color: colors.teal,
    fontSize: 19,
    marginRight: 2,
  },
  contactType: {
    color: colors.muted,
    fontSize: 11,
    letterSpacing: 0.4,
  },
  chatHeader: {
    alignItems: 'center',
    backgroundColor: colors.green,
    flexDirection: 'row',
    minHeight: 64,
    paddingHorizontal: 12,
  },
  backButton: {
    alignItems: 'center',
    height: 40,
    justifyContent: 'center',
    marginRight: 4,
    width: 32,
  },
  backIcon: {
    color: colors.surface,
    fontSize: 38,
    fontWeight: '300',
    lineHeight: 38,
  },
  chatAvatar: {
    borderRadius: 18,
    height: 36,
    width: 36,
  },
  chatHeaderDetails: {
    flex: 1,
    marginLeft: 10,
  },
  chatName: {
    color: colors.surface,
    fontSize: 16,
    fontWeight: '700',
  },
  chatStatus: {
    color: '#b9d8d2',
    fontSize: 12,
    marginTop: 2,
  },
  messageList: {
    flexGrow: 1,
    justifyContent: 'flex-end',
    paddingHorizontal: 12,
    paddingVertical: 16,
  },
  messageLine: {
    alignItems: 'flex-start',
    marginVertical: 4,
  },
  myMessageLine: {
    alignItems: 'flex-end',
  },
  messageBubble: {
    borderRadius: 12,
    maxWidth: '82%',
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  theirBubble: {
    backgroundColor: colors.incoming,
    borderBottomLeftRadius: 3,
  },
  myBubble: {
    backgroundColor: colors.bubble,
    borderBottomRightRadius: 3,
  },
  messageText: {
    color: colors.ink,
    fontSize: 15,
    lineHeight: 21,
  },
  messageTime: {
    color: colors.muted,
    fontSize: 10,
    marginTop: 3,
    textAlign: 'right',
  },
  composer: {
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderTopColor: colors.line,
    borderTopWidth: StyleSheet.hairlineWidth,
    flexDirection: 'row',
    gap: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  input: {
    backgroundColor: colors.canvas,
    borderRadius: 20,
    color: colors.ink,
    flex: 1,
    fontSize: 15,
    minHeight: 42,
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  sendButton: {
    alignItems: 'center',
    backgroundColor: colors.teal,
    borderRadius: 22,
    height: 44,
    justifyContent: 'center',
    width: 44,
  },
  sendIcon: {
    color: colors.surface,
    fontSize: 22,
    marginLeft: -2,
    marginTop: -2,
  },
  pressed: {
    opacity: 0.75,
  },
});

export default App;
